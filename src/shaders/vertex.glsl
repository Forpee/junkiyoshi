varying vec2 vUv;
attribute float random;
attribute float depth;
varying float vDepth;

uniform float uTime;

void main()
{
    vDepth=depth;
    // vec4 mvPosition=modelViewMatrix*vec4(position,1.);
    // gl_PointSize=100.*(1./-mvPosition.z);
    vec3 newpos=position*abs(sin(position.x*10.+uTime));
    gl_Position=projectionMatrix*modelViewMatrix*instanceMatrix*vec4(newpos,1.);
    
    vUv=uv;
}