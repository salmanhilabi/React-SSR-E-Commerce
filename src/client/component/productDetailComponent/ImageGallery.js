import React from "react";

class ImageGallery extends React.Component {
  state = {
    imgSrc: "",
    otherImg: [],
  };

  componentDidMount() {
    const { imgSrc, otherImg } = this.props.state;
    this.setState({ imgSrc, otherImg });
  }

  handleImg = (e) => {
    this.setState({ imgSrc: e.target.src });
  };

  render() {
    return (
      <div>
        <img
          style={{ width: "420px" }}
          alt="product-img"
          src={this.state.imgSrc}
        />
        <div className="small-images-wrapper">
          {this.state.otherImg.map((img, index) => {
            return (
              <img key={index} onClick={this.handleImg} alt={img} src={img} />
            );
          })}
        </div>
      </div>
    );
  }
}

export default ImageGallery;
