"use client";

import { useEffect, useRef } from "react";
import {
  createParticles,
  createRing,
  createSphere,
  multiply,
  normalMatrix,
  perspective,
  rotateX,
  rotateY,
  scale,
  translate,
} from "./gl";

const DISPLACEMENT = `
  float field(vec3 p, float t) {
    return sin(p.y * 3.1 + t * 0.8) * 0.5
         + sin(p.x * 4.3 - t * 0.6 * 1.0) * 0.3
         + sin(p.z * 3.7 + t * 1.0) * 0.35
         + cos(length(p) * 6.0 - t * 0.5) * 0.15;
  }
`;

const SURFACE_VS = `
  attribute vec3 aPos;
  attribute vec3 aNormal;
  uniform mat4 uProj;
  uniform mat4 uView;
  uniform mat4 uModel;
  uniform mat3 uNormalMat;
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vWorld;
  varying float vWave;
  ${DISPLACEMENT}
  void main() {
    vec3 p = aPos;
    float wave = field(p, uTime);
    vWave = wave;
    p += aNormal * (wave * 0.052 + 0.022);
    vec4 world = uModel * vec4(p, 1.0);
    vWorld = world.xyz;
    vNormal = normalize(uNormalMat * aNormal);
    gl_Position = uProj * uView * world;
  }
`;

const SURFACE_FS = `
  precision highp float;
  varying vec3 vNormal;
  varying vec3 vWorld;
  varying float vWave;
  uniform vec3 uCam;
  uniform vec3 uBase;
  uniform vec3 uRim;
  uniform vec3 uGlow;
  uniform float uTime;
  void main() {
    vec3 N = normalize(vNormal);
    vec3 V = normalize(uCam - vWorld);
    vec3 L1 = normalize(vec3(0.55, 0.9, 0.7));
    vec3 L2 = normalize(vec3(-0.8, -0.35, 0.25));
    float d1 = max(dot(N, L1), 0.0);
    float d2 = max(dot(N, L2), 0.0);
    float fres = pow(1.0 - max(dot(N, V), 0.0), 2.4);
    float spec = pow(max(dot(reflect(-L1, N), V), 0.0), 36.0);
    float bands = smoothstep(0.9, 1.0, sin(vWorld.y * 24.0 - uTime * 1.6) * 0.5 + 0.5);
    vec3 col = uBase * (0.3 + d1 * 0.85 + d2 * 0.22);
    col += uRim * fres * 1.25;
    col += uGlow * spec * 0.9;
    col += uGlow * bands * 0.045;
    col += vec3(0.018) * vWave;
    gl_FragColor = vec4(col, 1.0);
  }
`;

const LINE_VS = `
  attribute vec3 aPos;
  uniform mat4 uProj;
  uniform mat4 uView;
  uniform mat4 uModel;
  uniform float uTime;
  uniform float uDisp;
  ${DISPLACEMENT}
  void main() {
    vec3 p = aPos;
    float wave = field(p, uTime);
    p += normalize(p) * (wave * 0.052 + 0.022) * uDisp;
    p *= 1.003 + uDisp * 0.006;
    gl_Position = uProj * uView * uModel * vec4(p, 1.0);
  }
`;

const FLAT_FS = `
  precision mediump float;
  uniform vec4 uColor;
  void main() {
    gl_FragColor = uColor;
  }
`;

const POINT_VS = `
  attribute vec3 aPos;
  attribute float aSeed;
  uniform mat4 uProj;
  uniform mat4 uView;
  uniform mat4 uModel;
  uniform float uTime;
  uniform float uDpr;
  uniform float uSize;
  varying float vAlpha;
  void main() {
    vec3 p = aPos;
    p.y += sin(uTime * 0.3 + aSeed * 6.283) * 0.04;
    vec4 view = uView * uModel * vec4(p, 1.0);
    gl_Position = uProj * view;
    gl_PointSize = uSize * uDpr * (1.0 / max(-view.z, 0.2)) * (0.55 + 0.45 * sin(uTime * 1.1 + aSeed * 9.0));
    vAlpha = 0.3 + 0.7 * (0.5 + 0.5 * sin(uTime * 1.3 + aSeed * 11.0));
  }
`;

const POINT_FS = `
  precision mediump float;
  varying float vAlpha;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  void main() {
    vec2 c = gl_PointCoord - vec2(0.5);
    float d = length(c);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.0, d) * vAlpha;
    vec3 col = mix(uColorA, uColorB, clamp(vAlpha, 0.0, 1.0));
    gl_FragColor = vec4(col, a * 0.85);
  }
`;

type Uniforms = Record<string, WebGLUniformLocation | null>;

function compileProgram(gl: WebGLRenderingContext, vsSource: string, fsSource: string) {
  const create = (type: number, source: string) => {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  };

  const vs = create(gl.VERTEX_SHADER, vsSource);
  const fs = create(gl.FRAGMENT_SHADER, fsSource);
  if (!vs || !fs) return null;

  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  gl.deleteShader(vs);
  gl.deleteShader(fs);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

function getUniforms(gl: WebGLRenderingContext, program: WebGLProgram, names: string[]): Uniforms {
  const uniforms: Uniforms = {};
  for (const name of names) uniforms[name] = gl.getUniformLocation(program, name);
  return uniforms;
}

export default function HeroScene({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let gl: WebGLRenderingContext | null = null;
    try {
      gl = canvas.getContext("webgl", {
        alpha: true,
        antialias: true,
        depth: true,
        premultipliedAlpha: false,
        powerPreference: "high-performance",
      }) as WebGLRenderingContext | null;
    } catch {
      gl = null;
    }
    if (!gl) return;

    const context = gl;

    const surfaceProgram = compileProgram(context, SURFACE_VS, SURFACE_FS);
    const lineProgram = compileProgram(context, LINE_VS, FLAT_FS);
    const pointProgram = compileProgram(context, POINT_VS, POINT_FS);
    if (!surfaceProgram || !lineProgram || !pointProgram) return;

    const compact = window.matchMedia("(max-width: 767px)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sphere = createSphere(compact ? 40 : 56, compact ? 26 : 38);
    const particles = createParticles(compact ? 240 : 560);
    const ring = createRing(compact ? 120 : 180, 1.62);

    const makeBuffer = (data: Float32Array | Uint16Array, target: number) => {
      const buffer = context.createBuffer();
      if (!buffer) return null;
      context.bindBuffer(target, buffer);
      context.bufferData(target, data, context.STATIC_DRAW);
      return buffer;
    };

    const positionBuffer = makeBuffer(sphere.positions, context.ARRAY_BUFFER);
    const normalBuffer = makeBuffer(sphere.normals, context.ARRAY_BUFFER);
    const indexBuffer = makeBuffer(sphere.indices, context.ELEMENT_ARRAY_BUFFER);
    const lineIndexBuffer = makeBuffer(sphere.lineIndices, context.ELEMENT_ARRAY_BUFFER);
    const linePositionBuffer = makeBuffer(sphere.positions, context.ARRAY_BUFFER);
    const ringBuffer = makeBuffer(ring, context.ARRAY_BUFFER);
    const particleBuffer = makeBuffer(particles.positions, context.ARRAY_BUFFER);
    const seedBuffer = makeBuffer(particles.seeds, context.ARRAY_BUFFER);

    const surfaceUniforms = getUniforms(context, surfaceProgram, [
      "uProj",
      "uView",
      "uModel",
      "uNormalMat",
      "uTime",
      "uCam",
      "uBase",
      "uRim",
      "uGlow",
    ]);
    const lineUniforms = getUniforms(context, lineProgram, [
      "uProj",
      "uView",
      "uModel",
      "uTime",
      "uDisp",
      "uColor",
    ]);
    const pointUniforms = getUniforms(context, pointProgram, [
      "uProj",
      "uView",
      "uModel",
      "uTime",
      "uDpr",
      "uSize",
      "uColorA",
      "uColorB",
    ]);

    const surfacePosAttr = context.getAttribLocation(surfaceProgram, "aPos");
    const surfaceNormalAttr = context.getAttribLocation(surfaceProgram, "aNormal");
    const linePosAttr = context.getAttribLocation(lineProgram, "aPos");
    const pointPosAttr = context.getAttribLocation(pointProgram, "aPos");
    const pointSeedAttr = context.getAttribLocation(pointProgram, "aSeed");

    const state = {
      pointerX: 0,
      pointerY: 0,
      smoothX: 0,
      smoothY: 0,
      scroll: 0,
      visible: true,
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const width = Math.max(1, Math.floor(rect.width * dpr));
      const height = Math.max(1, Math.floor(rect.height * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      context.viewport(0, 0, width, height);
      return { width, height, dpr };
    };

    let clock = 0;

    const draw = (delta: number) => {
      const { width, height, dpr } = resize();
      if (width < 2 || height < 2) return;
      clock += reducedMotion ? 0 : Math.min(delta, 0.05);

      state.smoothX += (state.pointerX - state.smoothX) * 0.045;
      state.smoothY += (state.pointerY - state.smoothY) * 0.045;

      const aspect = width / height;
      const camZ = 3.55 - state.scroll * 0.5;
      const proj = perspective((46 * Math.PI) / 180, aspect, 0.1, 24);
      const view = translate(0, 0, -camZ);
      const shiftX = aspect > 1.15 ? 1.0 : 0;

      const model = multiply(
        translate(shiftX, -0.04, 0),
        multiply(
          rotateY(clock * 0.17 + state.smoothX * 0.55),
          multiply(rotateX(0.26 + state.smoothY * 0.28), scale(1 + state.scroll * 0.12)),
        ),
      );

      context.clearColor(0, 0, 0, 0);
      context.clear(context.COLOR_BUFFER_BIT | context.DEPTH_BUFFER_BIT);
      context.enable(context.DEPTH_TEST);
      context.depthFunc(context.LEQUAL);
      context.enable(context.BLEND);

      // --- core surface ---
      context.blendFunc(context.SRC_ALPHA, context.ONE_MINUS_SRC_ALPHA);
      context.depthMask(true);
      context.useProgram(surfaceProgram);
      context.uniformMatrix4fv(surfaceUniforms.uProj, false, proj);
      context.uniformMatrix4fv(surfaceUniforms.uView, false, view);
      context.uniformMatrix4fv(surfaceUniforms.uModel, false, model);
      context.uniformMatrix3fv(surfaceUniforms.uNormalMat, false, normalMatrix(model));
      context.uniform1f(surfaceUniforms.uTime, clock);
      context.uniform3f(surfaceUniforms.uCam, 0, 0, camZ);
      context.uniform3f(surfaceUniforms.uBase, 0.035, 0.045, 0.085);
      context.uniform3f(surfaceUniforms.uRim, 0.32, 0.26, 0.85);
      context.uniform3f(surfaceUniforms.uGlow, 0.34, 0.92, 0.86);

      if (positionBuffer && normalBuffer && indexBuffer) {
        context.bindBuffer(context.ARRAY_BUFFER, positionBuffer);
        context.enableVertexAttribArray(surfacePosAttr);
        context.vertexAttribPointer(surfacePosAttr, 3, context.FLOAT, false, 0, 0);
        context.bindBuffer(context.ARRAY_BUFFER, normalBuffer);
        context.enableVertexAttribArray(surfaceNormalAttr);
        context.vertexAttribPointer(surfaceNormalAttr, 3, context.FLOAT, false, 0, 0);
        context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, indexBuffer);
        context.drawElements(context.TRIANGLES, sphere.indices.length, context.UNSIGNED_SHORT, 0);
      }

      // --- wireframe ---
      context.useProgram(lineProgram);
      context.depthMask(false);
      context.uniformMatrix4fv(lineUniforms.uProj, false, proj);
      context.uniformMatrix4fv(lineUniforms.uView, false, view);
      context.uniformMatrix4fv(lineUniforms.uModel, false, model);
      context.uniform1f(lineUniforms.uTime, clock);
      context.uniform1f(lineUniforms.uDisp, 1);
      context.uniform4f(lineUniforms.uColor, 0.42, 0.52, 0.95, 0.16);

      if (linePositionBuffer && lineIndexBuffer) {
        context.bindBuffer(context.ARRAY_BUFFER, linePositionBuffer);
        context.enableVertexAttribArray(linePosAttr);
        context.vertexAttribPointer(linePosAttr, 3, context.FLOAT, false, 0, 0);
        context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, lineIndexBuffer);
        context.drawElements(context.LINES, sphere.lineIndices.length, context.UNSIGNED_SHORT, 0);
      }

      // --- orbital ring ---
      if (ringBuffer) {
        const ringModel = multiply(model, rotateX(1.16));
        context.uniformMatrix4fv(lineUniforms.uModel, false, ringModel);
        context.uniform1f(lineUniforms.uDisp, 0);
        context.uniform4f(lineUniforms.uColor, 0.36, 0.85, 0.82, 0.3);
        context.bindBuffer(context.ARRAY_BUFFER, ringBuffer);
        context.enableVertexAttribArray(linePosAttr);
        context.vertexAttribPointer(linePosAttr, 3, context.FLOAT, false, 0, 0);
        context.drawArrays(context.LINE_LOOP, 0, ring.length / 3);
      }

      // --- particles ---
      context.useProgram(pointProgram);
      context.blendFunc(context.SRC_ALPHA, context.ONE);
      context.uniformMatrix4fv(pointUniforms.uProj, false, proj);
      context.uniformMatrix4fv(pointUniforms.uView, false, view);
      context.uniformMatrix4fv(pointUniforms.uModel, false, model);
      context.uniform1f(pointUniforms.uTime, clock);
      context.uniform1f(pointUniforms.uDpr, dpr);
      context.uniform1f(pointUniforms.uSize, compact ? 5.4 : 4.2);
      context.uniform3f(pointUniforms.uColorA, 0.4, 0.55, 1.0);
      context.uniform3f(pointUniforms.uColorB, 0.35, 0.98, 0.86);

      if (particleBuffer && seedBuffer) {
        context.bindBuffer(context.ARRAY_BUFFER, particleBuffer);
        context.enableVertexAttribArray(pointPosAttr);
        context.vertexAttribPointer(pointPosAttr, 3, context.FLOAT, false, 0, 0);
        context.bindBuffer(context.ARRAY_BUFFER, seedBuffer);
        context.enableVertexAttribArray(pointSeedAttr);
        context.vertexAttribPointer(pointSeedAttr, 1, context.FLOAT, false, 0, 0);
        context.drawArrays(context.POINTS, 0, particles.seeds.length);
      }

      context.depthMask(true);
    };

    let frame = 0;
    let previous = performance.now();
    const loop = (now: number) => {
      frame = requestAnimationFrame(loop);
      const delta = (now - previous) / 1000;
      previous = now;
      if (!state.visible || document.hidden) return;
      draw(delta);
    };

    const onPointerMove = (event: PointerEvent) => {
      state.pointerX = (event.clientX / window.innerWidth - 0.5) * 2;
      state.pointerY = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    const onScroll = () => {
      state.scroll = Math.min(Math.max(window.scrollY / Math.max(window.innerHeight, 1), 0), 1);
    };

    draw(0);
    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(canvas);

    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          state.visible = entries.some((entry) => entry.isIntersecting);
        },
        { threshold: 0 },
      );
      observer.observe(canvas);
    }

    if (!reducedMotion) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("scroll", onScroll, { passive: true });
      frame = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      observer?.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      for (const buffer of [
        positionBuffer,
        normalBuffer,
        indexBuffer,
        lineIndexBuffer,
        linePositionBuffer,
        ringBuffer,
        particleBuffer,
        seedBuffer,
      ]) {
        if (buffer) context.deleteBuffer(buffer);
      }
      context.deleteProgram(surfaceProgram);
      context.deleteProgram(lineProgram);
      context.deleteProgram(pointProgram);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
