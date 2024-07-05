import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import { useFrame } from 'react-three-fiber';


function Controls({ onMove }:{onMove:(value:string)=> void}) {
    return (
      <div style={{ position: 'absolute', top: 20, left: 20 }}>
        <button onClick={() => onMove('up')}>Up</button>
        <button onClick={() => onMove('down')}>Down</button>
        <button onClick={() => onMove('left')}>Left</button>
        <button onClick={() => onMove('right')}>Right</button>
      </div>
    );
  }
  
  function Model(props:any) {
    const bodyRef = useRef<any>();
//   const { scene } = useGLTF('/model.gltf');
const gltf  = useGLTF('/model.gltf');
  useEffect(() => {
    const body = gltf.scene.getObjectByName('2.Truc chay');
    console.log("body:",body);
    gltf.scene.traverse((child:any) => {
        if (child.isMesh) {
          child.material.color.set(props.color);
        }
      });
    if (body) {
      bodyRef.current = body;
    //   body.up.y = 2000
      // Manipulate properties if needed
    //   body.rotation.set(0, 0.36593329906463623, 0);
    //   body.scale.set(-43.00722885131836, -43.007232666015625, -43.00722885131836);
    body.up.set(0, -0.50802825689315796, 0);
    }
  }, [gltf]);

  useFrame(() => {
    if (bodyRef.current) {
      bodyRef.current.up.set(props.position[0], props.position[1], props.position[2]);
    }
  });

  return <primitive object={gltf.scene}  scale={props.scale} {...props} />;
}

function DraggableModel({ position }:any) {

    console.log("position:",position);
    
    return (
      <mesh position={position}>
        <Model scale={[2, 2, 2]} color="blue" childPosition={[1, 1, 1]}/>
      </mesh>
    );
  }
  
function Home() {

    // const [position, setPosition] = useState([0, 0, 0]);
    const [position, setPosition] = useState([0, -0.20802825689315796, 0]);

  const move = (axis:any, delta:any) => {
    setPosition((prev) => {
      const newPosition = [...prev];
      newPosition[axis] += delta;
      return newPosition;
    });
  };

  const handleMove = (direction:any) => {
    setPosition((prevPosition) => {
      switch (direction) {
        case 'up':
          return [prevPosition[0], prevPosition[1] + 0.1, prevPosition[2]];
        case 'down':
          return [prevPosition[0], prevPosition[1] - 0.1, prevPosition[2]];
        case 'left':
          return [prevPosition[0] - 0.1, prevPosition[1], prevPosition[2]];
        case 'right':
          return [prevPosition[0] + 0.1, prevPosition[1], prevPosition[2]];
        default:
          return prevPosition;
      }
    });
  };
  
  return (
    <div style={{ height: '100vh' }} className='background'>
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />
      {/* <Model position={[0, 0, 0]} scale={[2, 2, 2]} color="blue"/> */}
      {/* <DraggableModel position={position} /> */}
      <Model scale={[2, 2, 2]} color="blue" position={position}/>
    </Canvas>
    <div style={{ position: 'absolute', top: 20, left: 20 }}>
        <button onClick={() => move(0, -1)}>Left</button>
        <button onClick={() => move(0, 1)}>Right</button>
        <button onClick={() => move(1, 1)}>Up</button>
        <button onClick={() => move(1, -1)}>Down</button>
      </div>
      {/* <Controls onMove={handleMove} /> */}
  </div>
  );
}

export default Home;
