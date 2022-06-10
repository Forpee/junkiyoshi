uniform float uTime;

varying vec2 vUv;

void main()
{
    float width=.03;
    
    float prec=.001;
    
    float border=max(
        smoothstep(width+prec,width-prec,vUv.x),
    )
    gl_FragColor=vec4(vUv,1.,1.);
}