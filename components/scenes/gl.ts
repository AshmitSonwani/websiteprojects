/**
 * Minimal column-major matrix maths and procedural geometry for the hero scene.
 * Kept dependency-free so the 3D layer ships without a heavy runtime.
 */

export type Mat4 = Float32Array;

export function identity(): Mat4 {
  const m = new Float32Array(16);
  m[0] = 1;
  m[5] = 1;
  m[10] = 1;
  m[15] = 1;
  return m;
}

export function multiply(a: Mat4, b: Mat4): Mat4 {
  const out = new Float32Array(16);
  for (let col = 0; col < 4; col += 1) {
    for (let row = 0; row < 4; row += 1) {
      let sum = 0;
      for (let k = 0; k < 4; k += 1) {
        sum += a[k * 4 + row] * b[col * 4 + k];
      }
      out[col * 4 + row] = sum;
    }
  }
  return out;
}

export function perspective(fovRadians: number, aspect: number, near: number, far: number): Mat4 {
  const f = 1 / Math.tan(fovRadians / 2);
  const nf = 1 / (near - far);
  const m = new Float32Array(16);
  m[0] = f / aspect;
  m[5] = f;
  m[10] = (far + near) * nf;
  m[11] = -1;
  m[14] = 2 * far * near * nf;
  return m;
}

export function translate(x: number, y: number, z: number): Mat4 {
  const m = identity();
  m[12] = x;
  m[13] = y;
  m[14] = z;
  return m;
}

export function rotateX(angle: number): Mat4 {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  const m = identity();
  m[5] = c;
  m[6] = s;
  m[9] = -s;
  m[10] = c;
  return m;
}

export function rotateY(angle: number): Mat4 {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  const m = identity();
  m[0] = c;
  m[2] = -s;
  m[8] = s;
  m[10] = c;
  return m;
}

export function rotateZ(angle: number): Mat4 {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  const m = identity();
  m[0] = c;
  m[1] = s;
  m[4] = -s;
  m[5] = c;
  return m;
}

export function scale(s: number): Mat4 {
  const m = identity();
  m[0] = s;
  m[5] = s;
  m[10] = s;
  return m;
}

/** Upper-left 3x3 of the model matrix with columns normalised. */
export function normalMatrix(model: Mat4): Float32Array {
  const out = new Float32Array(9);
  const columns = [
    [model[0], model[1], model[2]],
    [model[4], model[5], model[6]],
    [model[8], model[9], model[10]],
  ];
  for (let i = 0; i < 3; i += 1) {
    const [x, y, z] = columns[i];
    const length = Math.hypot(x, y, z) || 1;
    out[i * 3] = x / length;
    out[i * 3 + 1] = y / length;
    out[i * 3 + 2] = z / length;
  }
  return out;
}

export interface SphereGeometry {
  positions: Float32Array;
  normals: Float32Array;
  indices: Uint16Array;
  lineIndices: Uint16Array;
}

/** UV sphere with latitude and meridian line indices for a wireframe pass. */
export function createSphere(segments = 56, rings = 38): SphereGeometry {
  const positions: number[] = [];
  const normals: number[] = [];
  const indices: number[] = [];
  const lineIndices: number[] = [];

  for (let ring = 0; ring <= rings; ring += 1) {
    const v = ring / rings;
    const theta = v * Math.PI;
    for (let segment = 0; segment <= segments; segment += 1) {
      const u = segment / segments;
      const phi = u * Math.PI * 2;
      const x = Math.sin(theta) * Math.cos(phi);
      const y = Math.cos(theta);
      const z = Math.sin(theta) * Math.sin(phi);
      positions.push(x, y, z);
      normals.push(x, y, z);
    }
  }

  for (let ring = 0; ring < rings; ring += 1) {
    for (let segment = 0; segment < segments; segment += 1) {
      const a = ring * (segments + 1) + segment;
      const b = a + segments + 1;
      indices.push(a, b, a + 1, b, b + 1, a + 1);
    }
  }

  // Latitude rings
  for (let ring = 1; ring < rings; ring += 1) {
    for (let segment = 0; segment < segments; segment += 1) {
      const a = ring * (segments + 1) + segment;
      lineIndices.push(a, a + 1);
    }
  }

  // Meridians, spaced out so the wireframe stays legible
  for (let segment = 0; segment < segments; segment += 4) {
    for (let ring = 0; ring < rings; ring += 1) {
      const a = ring * (segments + 1) + segment;
      lineIndices.push(a, a + segments + 1);
    }
  }

  return {
    positions: new Float32Array(positions),
    normals: new Float32Array(normals),
    indices: new Uint16Array(indices),
    lineIndices: new Uint16Array(lineIndices),
  };
}

/** Points on a spherical shell, plus a per-point random seed. */
export function createParticles(count: number, inner = 1.35, outer = 2.25): {
  positions: Float32Array;
  seeds: Float32Array;
} {
  const positions = new Float32Array(count * 3);
  const seeds = new Float32Array(count);

  for (let i = 0; i < count; i += 1) {
    const theta = Math.acos(2 * Math.random() - 1);
    const phi = Math.random() * Math.PI * 2;
    const radius = inner + Math.random() * (outer - inner);
    const sinTheta = Math.sin(theta);
    positions[i * 3] = sinTheta * Math.cos(phi) * radius;
    positions[i * 3 + 1] = Math.cos(theta) * radius;
    positions[i * 3 + 2] = sinTheta * Math.sin(phi) * radius;
    seeds[i] = Math.random();
  }

  return { positions, seeds };
}

/** Points on a ring in the XZ plane. */
export function createRing(count = 160, radius = 1.62): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    const angle = (i / count) * Math.PI * 2;
    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = 0;
    positions[i * 3 + 2] = Math.sin(angle) * radius;
  }
  return positions;
}
