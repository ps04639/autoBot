import React, { Component } from 'react';

class ImageComponent extends Component {

    imageClick = () => {
        let modal = document.getElementsByClassName('modal')[0];
        modal.style.display = "block";
    }
    
    closePopUp = () => {
        let modal = document.getElementsByClassName('modal')[0];
        modal.style.display = "none";
    }


    render() {
        return (
            <div>
                <img className="respImg" src={this.props.imagePath} alt="Coffee" onClick={this.imageClick}></img>
                <div className="modal">
                    <span className="close" onClick={this.closePopUp}>&times;</span>
                    <img src={this.props.imagePath} className="modal-content" alt="Coffee"></img>
                </div>
            </div>
        );
    }
}

export default ImageComponent;