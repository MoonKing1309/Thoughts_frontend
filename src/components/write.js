import writestyle from './write.module.css'


function Write() {
    return ( 
        <div id={writestyle.container}>
            <canvas id={writestyle.canvas}>

            </canvas>
        </div>
     );
}

export default Write;

