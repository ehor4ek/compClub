
export default function Slide(props) {
    const src = {
        0: 'place.png',
        1: 'security.png',
        2: 'plus.png',
        3: 'car.png',
    };
    return(
        <div className="benefits_item">
            <div className="benefits_item_inner">
                <div className="benefits_img"><img src={src[props.num]} alt="" /></div>
                <div className="benefits_text">{props.content}</div>
            </div>
        </div>
    );
}