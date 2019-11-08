import React from 'react';

const imageClick = () =>
{
    let modal = document.getElementsByClassName( 'modal' )[ 0 ];
    modal.style.display = "block";
}

const closePopUp = () =>
{
    let modal = document.getElementsByClassName( 'modal' )[ 0 ];
    modal.style.display = "none";
}

const ImageComponent = ( props ) =>
{
    return (
        <div>
            <img className="respImg" src={ props.imagePath } alt="Coffee" onClick={ imageClick }></img>
            <div className="modal">
                <span className="close" onClick={ closePopUp }>&times;</span>
                <img src={ props.imagePath } className="modal-content" alt="Coffee"></img>
            </div>
        </div>
    );
}

export default ImageComponent;