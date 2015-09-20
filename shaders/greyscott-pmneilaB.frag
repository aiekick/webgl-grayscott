// FROM https://github.com/pmneila/jsexp

precision mediump float;

uniform vec2 resolution;
uniform sampler2D tSource;
uniform sampler2D tLapl;
uniform float delta;
uniform float feed;
uniform float kill;

void main() {
    vec2 vUv = gl_FragCoord.xy / resolution;

    float step_x = 1.0 / resolution.x;
    float step_y = 1.0 / resolution.y; // Resolution

    // float feed = vUv.y * 0.083;
    // float kill = vUv.x * 0.073;

    vec2 uv = texture2D(tSource, vUv).rg;

    vec2 lapl = texture2D(tLapl, vUv).rg;
    float du = /*0.00002*/0.2097*lapl.r - uv.r*uv.g*uv.g + feed*(1.0 - uv.r);
    float dv = /*0.00001*/0.105*lapl.g + uv.r*uv.g*uv.g - (feed+kill)*uv.g;
    vec2 dst = uv + delta*vec2(du, dv);

    gl_FragColor = vec4(dst.r, dst.g, 0.0, 1.0);
}
