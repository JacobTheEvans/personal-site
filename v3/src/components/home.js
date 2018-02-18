import React from "react";
import Slider from "react-slick";
import FontAwesome from "react-fontawesome";
import Bars from "react-bars";

const settings = {
  className: "center",
  infinite: true,
  centerPadding: "100px",
  slidesToShow: 1,
  swipeToSlide: true,
  dots: true,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 4500
};

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      height: 350,
      langs: [
        {
          label: "HTML",
          value: 80
        }, {
          label: "CSS",
          value: 70
        }, {
          label: "JavaScript",
          value: 90
        }, {
          label: "Python",
          value: 70
        }, {
          label: "PHP",
          value: 60
        }
      ],
      frameworks: [
        {
          label: "React",
          value: 80
        }, {
          label: "Redux",
          value: 75
        }, {
          label: "Angular",
          value: 80
        }, {
          label: "Express",
          value: 80
        }, {
          label: "Wordpress",
          value: 70
        }, {
          label: "jQuery",
          value: 85
        },  {
          label: "Mongoose",
          value: 80
        },
        {
          label: "D3",
          value: 60
        },
        {
          label: "Bootstrap",
          value: 70
        }
      ],
      databases: [
        {
          label: "MySQL",
          value: 75
        }, {
          label: "PostgreSQL",
          value: 80
        }, {
          label: "MongoDB",
          value: 80
        }
      ]
    };
  }
  componentDidMount() {
    this.setState({height: document.getElementById("about").clientHeight});
    window.onresize = () => {
      this.setState({height: document.getElementById("about").clientHeight});
    };
  }
  genSlider() {
    if (this.props.portfolioItems.length > 0) {
      return (
        <Slider {...settings}>
          {this.props.portfolioItems.map(function(item, index) {
            return (
              <div className="port-item" key={"id" + item.name + index}>
                <div className="row">
                  <div className="six columns">
                    <div className="slider-text-custom" id="about">
                      <h5>{item.name}</h5>
                      <p>{item.desc}</p>
                      <a rel="noopener noreferrer" target="_blank" className="button button-blue btn-port" href={item.url}>Code Here</a>
                    </div>
                  </div>
                  <div className="six columns">
                    <div className="port-img">
                      <img alt="Portfolio" src={item.img}/>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </Slider>
      )
    } else {
      return (
        <div>
          <p>Loading...</p>
        </div>
      )
    }
  }
  render() {
    return (
      <div className="blogWrapper">
        <div className="header"></div>
        <div className="over-header">
          <h1>Jacob Evans</h1>
          <h4>Web Developer and Amazing Nerd</h4>
        </div>
        <div className="center-div about-sec">
          <h3 className="center-text">About</h3>
          <div className="line-top"></div>
          <div className="row">
            <div className="five columns overide-mobile">
              <div className="profile-image" style={{
                height: `${this.state.height}px`,
                backgroundImage: `url(http://i.imgur.com/YQy26hJ.jpg)`
              }}></div>
            </div>
            <div className="seven columns overide-mobile" id="about">
              <div className="justify-custom">
                <p>I am Jacob Evans. I have a passion for programming and an overwhelming zeal when it comes to learning. I am an avid Linux user, a supporter of the open source movement, and an advocate of using technology to improve the world.</p>
                <p>When I'm not working I program personal projects, mentoring other programmers and play board games poorly. If you would like to contact me send me an e-mail at jacobtheevans@hotmail.com</p>
                <div className="row">
                  <div className="six columns btn-area">
                    <a rel="noopener noreferrer" href="mailto:jacobtheevans@hotmail.com" target="_blank" className="button button-blue btn-wide">Email <FontAwesome name="envelope"/></a>
                  </div>
                  <div className="six columns btn-area">
                    <a rel="noopener noreferrer" href="https://github.com/JacobTheEvans" target="_blank" className="button button-blue btn-wide">Github <FontAwesome name="github"/></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grey-back">
          <div className="center-div">
            <h3 className="center-text">Skills</h3>
            <div className="line-top"></div>
            <div className="row">
              <div className="six columns">
                <label className="skill-label lang-label">Languages</label>
                <Bars data={this.state.langs}/>
                <label className="skill-label data-label">Databases</label>
                <Bars data={this.state.databases}/>
              </div>
              <div className="six columns">
                <label className="skill-label">Frameworks</label>
                <Bars data={this.state.frameworks}/>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="center-div">
            <div className="image-sec center-text">
              <h3>Portfolio</h3>
              <div className="line-top"></div>
              {this.genSlider()}
            </div>
          </div>
        </div>
        <div className="grey-back bottom-before-footer">
          <div className="center-div">
            <h3 className="center-text">Testimonials</h3>
            <div className="line-top"></div>
            <div className="row">
              <div className="twelve columns">
                <div className="testimonial">
                  <p>Jacob is one of those people who's always doing something to make himself better. Not only that, he's more than willing to share that knowledge to help those around him. He simply doesn't stop learning.</p>
                  <p className="text-left testimonial-name">- <i>Jacob Quinn Sanders</i> a <span className="blue-text">Software Engineer and Storyteller</span></p>
                </div>
              </div>
              <div className="twelve columns">
                <div className="testimonial">
                  <p>Here we are talking about the teacher, programmer and friend Jacob. The person who managed to take normal people, who had zero coding backgrounds and turn them into actual programmers. We are also talking about the person who managed to create an amazing family from a class.</p>
                  <p className="text-left testimonial-name">- <i>Sendus Majanni</i> a <span className="blue-text">Student From Makkasid/Vschool </span></p>
                </div>
              </div>
              <div className="twelve columns">
                <div className="testimonial">
                  <p>Jacob is an incredibly talented developer whose never-ending thirst for knowledge is matched only by his desire to contribute to the software development community through teaching and taking part in open-source projects. I consider myself extremely lucky to have been one of Jacob's students.</p>
                  <p className="text-left testimonial-name">- <i>Michael Montgomery</i> a <span className="blue-text">SoftwareDeveloper and UI/UX Consultant</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home;
