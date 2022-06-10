varying vec2 vUv;
attribute float random;

void main()
{
    // vec4 mvPosition=modelViewMatrix*vec4(position,1.);
    // gl_PointSize=100.*(1./-mvPosition.z);
    vec3 newpos=random*position;
    gl_Position=projectionMatrix*modelViewMatrix*instanceMatrix*vec4(newpos,1.);
    
    vUv=uv;
}