uniform float uTime;

varying vec2 vUv;

void main()
{
    float width=.03;
    
    float prec=.001;
    
    float borderx=max(
        smoothstep(width+prec,width-prec,vUv.x),
        smoothstep(width+prec,width-prec,1.-vUv.x)
        
    );
    
    float bordery=max(
        smoothstep(width+prec,width-prec,vUv.y),
        smoothstep(width+prec,width-prec,1.-vUv.y)
        
    );
    
    float border=max(borderx,bordery);
    
    vec3 finalColor=mix(vec3(.354,.332,.975),vec3(1.,1.,1.),border);
    
    gl_FragColor=vec4(finalColor,1.);
}