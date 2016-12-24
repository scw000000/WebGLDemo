# WebGLDemo

![alt tag](https://github.com/scw000000/WebGLDemo/blob/master/Lab5/Lab5/WebGLDemo.png)

This repository is for Real Time Rendering class in the Ohio State University, which contains lab assignment and other testing stuff in WebGL.

The final Lab can be seen on http://web.cse.ohio-state.edu/~sun.1928/  (Google Chrome Recommended)

1. How to use the program:
--
![alt tag](https://github.com/scw000000/WebGLDemo/blob/master/Lab5/Lab5/Screen%20Shot.bmp)

Control Camera:  
* W, S, A, D, F, C: Forwad, Backward, Left, Right, Up, Down   
* Arrow Keys: Rotation  

Control Music:  
* When the music is turned on, the animation will start  
  
Control Render Output:  
* This lab is implemented by using Deferred Shading, Screen Space Ambient Occlusion (SSAO), Bloom, and Normal Mapping, and each rendering pass will generate one or more screen space textures. To see what these textures looked like, press these buttons.  
  
Control SSAO:  
* Enable SSAO: Turn SSAO on/ off  
* SSAO Radius: Control the radius of sample hemisphere when rendering SSAO texture  
* SSAO Power: Control the power of the occlusion function output, i.e. occlusion = pow( original occlusion, SSAO power )  
* Sample Num: Control how many sample points taken when rendering SSAO texture  
  
Control Light:  
* Light Radius: Control how far the light will affect the mesh objects. By adopting a distance checking when calculating lights, I can  
conserve computing power and avoid unnecessary interference from the lights in outer light cube cycle.  
* Gamma Power: Control the Gamma Correction power parameter when rendering the inner light cube cycle, because the color of cube will not  
be correct to human eyes by simply scaling a color with a scalar from 0 to 1.  
* Gamma Scalar: Control the Gamma Correction scalar parameter when rendering the inner light cube cycle  

Control Bloom:  
* Gaussian Blur Iteration Num: Control how many time to blur the light texture in order to render blur texture  
* Brightness Threshold: Control how the threshold for passing to light texture  
  
2. Implementation details:  
--
* The figure below shows the rendering sequence for each frame:  
* Blue arrows: Input texture  
* Yellow arrows: Output texture  
* Green arrows: Control flow
    
    
![alt tag](https://github.com/scw000000/WebGLDemo/blob/master/Lab5/Lab5/Flow%20Chart.bmp)  

3. Reference Materials:  
--
* http://learnopengl.com/#!Advanced-Lighting/SSAO   
* http://john-chapman-graphics.blogspot.com/2013/01/ssao-tutorial.html  
* http://learnopengl.com/#!Advanced-Lighting/Deferred-Shading  
* http://learnopengl.com/#!Advanced-Lighting/Bloom  
* https://www.patrick-wied.at/blog/how-to-create-audio-visualizations-with-javascript-html  
* http://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve  
* http://www.opengl-tutorial.org/intermediate-tutorials/tutorial-13-normal-mapping/  
