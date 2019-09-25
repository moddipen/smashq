import React from 'react'
import {
  Carousel as Car,
  CarouselItem,
  CarouselControl,
  Modal, ModalHeader, ModalBody, ModalFooter, Nav
} from 'reactstrap';
import { NavLink } from "redux-first-router-link";
import Carousel  from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
const responsive = {
	superLargeDesktop: {
	  // the naming can be any, depends on you.
	  breakpoint: { max: 4000, min: 3000 },
	  items: 5,
	},
	desktop: {
	  breakpoint: { max: 3000, min: 1024 },
	  items: 3,
	},
	tablet: {
	  breakpoint: { max: 1024, min: 464 },
	  items: 6,
	},
	mobile: {
	  breakpoint: { max: 464, min: 0 },
	  items: 3,
	},
  };

const items = [
  {
    src: '/img/noimg.png',
    altText: 'Slide 1',
    caption: ''
  },
  {
    src: '/img/noimg.png',
    altText: 'Slide 2',
    caption: ''
  },
  {
    src: '/img/noimg.png',
    altText: 'Slide 3',
    caption: ''
  }
];


class Page extends React.Component {
  static displayName = 'HomePage'
  static propTypes = {}

  constructor (props) {
    super(props)
   
    this.state = { activeIndex: 0 ,modal: false,modal1: false};
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
	this.onExited = this.onExited.bind(this);
	this.toggle = this.toggle.bind(this);
	this.toggle1 = this.toggle1.bind(this);
  }

   //modal toggle
   toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

    //modal toggle
	toggle1() {
		this.setState(prevState => ({
		  modal1: !prevState.modal1
		}));
	  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render () {
    const { activeIndex } = this.state;
   

    return (
      <section className="pad-4000 user-home-section">
			<div className="container container1030 clearfix">			
				<div className="mob-live-box-top mb-20 d-md-none">

				<Carousel responsive={responsive} swipeable={false}  draggable={true} removeArrowOnDeviceType={["tablet", "mobile"]}
  showDots={false}>
					<div className="live-hori-box first">
						<NavLink to="#" onClick={this.toggle1} className="inline-popup">
							<div className="live-hori-img-wrap">
								<img src="/img/noimg.png" alt="" className="mCS_img_loaded"/>
								<div className="icon-plus"><i className="fa fa-plus-circle"></i></div>
							</div>
							<span>John Doe</span>
						</NavLink>
					</div>
					
					<div className="live-hori-box">
						<a href="#">
							<div className="live-hori-img-wrap">
								<img src="/img/noimg.png" alt=""/>
								<div className="livetext">Live</div>
							</div>
							<span>John Doe</span>
						</a>
					</div>
					<div className="live-hori-box">
						<a href="#">
							<div className="live-hori-img-wrap">
								<img src="/img/noimg.png" alt=""/>
								<div className="livetext">Live</div>
							</div>
							<span>John Doe</span>
						</a>
					</div>
					<div className="live-hori-box complete">
						<a href="#">
							<div className="live-hori-img-wrap">
								<img src="/img/noimg.png" alt=""/>
							</div>
							<span>John Doe</span>
						</a>
					</div>
					<div className="live-hori-box">
						<a href="#">
							<div className="live-hori-img-wrap">
								<img src="/img/noimg.png" alt=""/>
								<div className="livetext">Live</div>
							</div>
							<span>John Doe</span>
						</a>
					</div>
					<div className="live-hori-box complete">
						<a href="#">
							<div className="live-hori-img-wrap">
								<img src="/img/noimg.png" alt=""/>
							</div>
							<span>John Doe</span>
						</a>
					</div>
					<div className="live-hori-box">
						<a href="#">
							<div className="live-hori-img-wrap">
								<img src="/img/noimg.png" alt=""/>
								<div className="livetext">Live</div>
							</div>
							<span>John Doe</span>
						</a>
					</div>
					<div className="live-hori-box complete">
						<a href="#">
							<div className="live-hori-img-wrap">
								<img src="/img/noimg.png" alt=""/>
							</div>
							<span>John Doe</span>
						</a>
					</div>
					<div className="live-hori-box">
						<a href="#">
							<div className="live-hori-img-wrap">
								<img src="/img/noimg.png" alt=""/>
								<div className="livetext">Live</div>
							</div>
							<span>John Doe</span>
						</a>
					</div>
					<div className="live-hori-box">
						<a href="#">
							<div className="live-hori-img-wrap">
								<img src="/img/noimg.png" alt=""/>
								<div className="livetext">Live</div>
							</div>
							<span>John Doe</span>
						</a>
					</div>
					<div className="live-hori-box">
						<a href="#">
							<div className="live-hori-img-wrap">
								<img src="/img/noimg.png" alt=""/>
								<div className="livetext">Live</div>
							</div>
							<span>John Doe</span>
						</a>
					</div>
					<div className="live-hori-box">
						<a href="#">
							<div className="live-hori-img-wrap">
								<img src="/img/noimg.png" alt=""/>
								<div className="livetext">Live</div>
							</div>
							<span>John Doe</span>
						</a>
					</div>
					<div className="live-hori-box complete">
						<a href="#">
							<div className="live-hori-img-wrap">
								<img src="/img/noimg.png" alt=""/>
							</div>
							<span>John Doe</span>
						</a>
					</div>
					<div className="live-hori-box">
						<a href="#">
							<div className="live-hori-img-wrap">
								<img src="/img/noimg.png" alt=""/>
								<div className="livetext">Live</div>
							</div>
							<span>John Doe</span>
						</a>
					</div>
					<div className="live-hori-box complete">
						<a href="#">
							<div className="live-hori-img-wrap">
								<img src="/img/noimg.png" alt=""/>
							</div>
							<span>John Doe</span>
						</a>
					</div>
					<div className="live-hori-box">
						<a href="#">
							<div className="live-hori-img-wrap">
								<img src="/img/noimg.png" alt=""/>
							</div>
							<span>John Doe</span>
						</a>
					</div>
					<div className="live-hori-box">
						<a href="#">
							<div className="live-hori-img-wrap">
								<img src="/img/noimg.png" alt=""/>
								<div className="livetext">Live</div>
							</div>
							<span>John Doe</span>
						</a>
					</div>
				
				</Carousel>					
				</div>
			
				<div className="user-home-post-wrap">
			
					<div className="user-home-post-box mb-30 bgwhite box-shadow">
						<div className="user-home-post-head d-flex align-items-center">
							<div className="user-home-profile-img">
								<a href="#"><img src="/img/noimg.png" alt=""/></a>
							</div>
							<div className="user-home-profile-name">
								<a href="#">John Doe</a>
							</div>
						</div>
						<div className="user-home-post-slider">           

							<Car							
							activeIndex={activeIndex}
							next={this.next}
							previous={this.previous}
							>
							
							{items.map(item => (
								<CarouselItem onExiting={this.onExiting}
									onExited={this.onExited}
									key={item.altText} >
									<img src={item.src} alt={item.altText} />									
								</CarouselItem>            
								))}
							<CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
							<CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
							</Car>
							
            			</div>
						<div className="user-home-post-foot">
							<div className="user-home-post-likes-box d-flex align-items-center">
								<div className="likes-icon">
									<i className="fa fa-heart"></i>
									<i className="fa fa-heart"></i>
								</div>
								<div className="likes-people">Liked by <span><a href="#" className="last-person">John</a></span> and <span><NavLink to="#" className="likes-popup" onClick={this.toggle}>106 Others</NavLink></span></div>

															
							</div>
							<div className="user-home-post-content">
								<p>Hey there, it’s <strong>Molly Bennett</strong> (@MollyX) Who wants to see how naughty my everyday life is? And maybe join me in the fun? Subscribe here to chat with me ? Let me blow your mind… and other things! </p>
								<a href="#">#aboc</a>
								<p>my website <a href="#">www.google.com</a></p>
							</div>
						</div>
					</div>

				
					<div className="user-home-suggestion for-mobile">
						<div className="user-home-suggestion-top-box">
							<span><strong>Suggestions For You</strong></span>
							<span><a href="#">See All</a></span>
						</div>
						<div className="user-home-suggestion-box">
							<div className="user-home-suggestion-img">
								<a href="#"><img src="/img/noimg.png" alt=""/></a>
							</div>
							<div className="user-home-suggestion-name">
								<a href="#">John Doe</a>
							</div>
							<div className="user-home-suggestion-btn">
								<a href="#" className="btn-custom">Follow</a>
							</div>
						</div>
						<div className="user-home-suggestion-box">
							<div className="user-home-suggestion-img">
								<a href="#"><img src="/img/noimg.png" alt=""/></a>
							</div>
							<div className="user-home-suggestion-name">
								<a href="#">John Doe</a>
							</div>
							<div className="user-home-suggestion-btn">
								<a href="#" className="btn-custom followed">Unfollow</a>
							</div>
						</div>
						<div className="user-home-suggestion-box">
							<div className="user-home-suggestion-img">
								<a href="#"><img src="/img/noimg.png" alt=""/></a>
							</div>
							<div className="user-home-suggestion-name">
								<a href="#">John Doe</a>
							</div>
							<div className="user-home-suggestion-btn">
								<a href="#" className="btn-custom">Follow</a>
							</div>
						</div>
						<div className="user-home-suggestion-box">
							<div className="user-home-suggestion-img">
								<a href="#"><img src="/img/noimg.png" alt=""/></a>
							</div>
							<div className="user-home-suggestion-name">
								<a href="#">John Doe</a>
							</div>
							<div className="user-home-suggestion-btn">
								<a href="#" className="btn-custom followed">Unfollow</a>
							</div>
						</div>
					</div>
	
					<div className="user-home-post-box mb-30 bgwhite box-shadow">
						<div className="user-home-post-head d-flex align-items-center">
							<div className="user-home-profile-img">
								<a href="#"><img src="/img/noimg.png" alt=""/></a>
							</div>
							<div className="user-home-profile-name">
								<a href="#">John Doe</a>
							</div>
						</div>
						<div className="user-home-post-slider">
						<Car
							activeIndex={activeIndex}
							next={this.next}
							previous={this.previous}
							>							
							{items.map(item => (
									<CarouselItem onExiting={this.onExiting}
									onExited={this.onExited}
									key={item.altText} >
									<img src={item.src} alt={item.altText} />									
								</CarouselItem>            
								))}
							<CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
							<CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
							</Car>
						</div>
						<div className="user-home-post-foot">
							<div className="user-home-post-likes-box d-flex align-items-center">
								<div className="likes-icon">
									<i className="fa fa-heart"></i>
									<i className="fa fa-heart"></i>
								</div>
								<div className="likes-people">Liked by <span><a href="#" className="last-person">John</a></span> and <span><NavLink to="#" className="likes-popup" onClick={this.toggle} >106 Others</NavLink></span></div>
									</div>
						</div>
					</div>

					<div className="user-home-post-box mb-30 bgwhite box-shadow">
						<div className="user-home-post-head d-flex align-items-center">
							<div className="user-home-profile-img">
								<a href="#"><img src="/img/noimg.png" alt=""/></a>
							</div>
							<div className="user-home-profile-name">
								<a href="#">John Doe</a>
							</div>
						</div>
						<div className="user-home-post-slider">
							<Car
								activeIndex={activeIndex}
								next={this.next}
								previous={this.previous}
								>
								
								{items.map(item => (
										<CarouselItem onExiting={this.onExiting}
										onExited={this.onExited}
										key={item.altText} >
										<img src={item.src} alt={item.altText} />									
									</CarouselItem>            
									))}
								<CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
								<CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
							</Car>
						</div>
						<div className="user-home-post-foot">
							<div className="user-home-post-likes-box d-flex align-items-center">
								<div className="likes-icon">
									<i className="fa fa-heart"></i>
									<i className="fa fa-heart"></i>
								</div>
								<div className="likes-people">Liked by <span><a href="#" className="last-person">John</a></span> and <span><NavLink to="#" className="likes-popup" onClick={this.toggle}>106 Others</NavLink></span></div>
								</div>
						</div>
					</div>
					
				
					<div className="user-home-post-box mb-30 bgwhite box-shadow">
						<div className="user-home-post-head d-flex align-items-center">
							<div className="user-home-profile-img">
								<a href="#"><img src="/img/noimg.png" alt=""/></a>
							</div>
							<div className="user-home-profile-name">
								<a href="#">John Doe</a>
							</div>
						</div>
						<div className="user-home-post-slider">
							<Car
							activeIndex={activeIndex}
							next={this.next}
							previous={this.previous}
							>
							
							{items.map(item => (
									<CarouselItem onExiting={this.onExiting}
									onExited={this.onExited}
									key={item.altText} >
									<img src={item.src} alt={item.altText} />									
								</CarouselItem>            
								))}
							<CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
							<CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
							</Car>
						</div>
						<div className="user-home-post-foot">
							<div className="user-home-post-likes-box d-flex align-items-center">
								<div className="likes-icon">
									<i className="fa fa-heart"></i>
									<i className="fa fa-heart"></i>
								</div>
								<div className="likes-people">Liked by <span><a href="#" className="last-person">John</a></span> and <span><NavLink
								to="#" className="likes-popup" onClick={this.toggle}>106 Others</NavLink></span></div>
							</div>
						</div>
					</div>

				</div>

		
				<div className="user-home-profile-col scrolltofixed">
			
					<div className="user-home-profile-box d-flex align-items-center">
						<div className="user-home-profile-box-img">
							<a href="#"><img src="/img/noimg.png" alt=""/></a>
						</div>
						<div className="user-home-profile-box-name">
							<a href="#">John Doe</a>
						</div>
					</div>

					<div className="user-home-suggestion live-box mb-10">
						<div className="user-home-suggestion-top-box">
							<span><strong>Live Suggestions For You</strong></span>
							<span><a href="#">See All</a></span>
						</div>
						<div className="user-home-suggestion-box">
							<div className="user-home-suggestion-img">
								<a href="#"><img src="/img/noimg.png" alt=""/></a>
							</div>
							<div className="user-home-suggestion-name">
								<a href="#">John Doe</a>
							</div>
							<div className="user-home-suggestion-btn">
								<a href="#" className="btn-custom live-btn">Live</a>
							</div>
						</div>
						<div className="user-home-suggestion-box">
							<div className="user-home-suggestion-img">
								<a href="#"><img src="/img/noimg.png" alt=""/></a>
							</div>
							<div className="user-home-suggestion-name">
								<a href="#">John Doe</a>
							</div>
							<div className="user-home-suggestion-btn">
								<a href="#" className="btn-custom live-btn preview-btn">Preview</a>
							</div>
						</div>
						<div className="user-home-suggestion-box">
							<div className="user-home-suggestion-img">
								<a href="#"><img src="/img/noimg.png" alt=""/></a>
							</div>
							<div className="user-home-suggestion-name">
								<a href="#">John Doe</a>
							</div>
							<div className="user-home-suggestion-btn">
								<a href="#" className="btn-custom live-btn">Live</a>
							</div>
						</div>
					</div>

					<div className="user-home-suggestion">
						<div className="user-home-suggestion-top-box">
							<span><strong>Suggestions For You</strong></span>
							<span><a href="#">See All</a></span>
						</div>
						<div className="user-home-suggestion-box">
							<div className="user-home-suggestion-img">
								<a href="#"><img src="/img/noimg.png" alt=""/></a>
							</div>
							<div className="user-home-suggestion-name">
								<a href="#">John Doe</a>
							</div>
							<div className="user-home-suggestion-btn">
								<a href="#" className="btn-custom">Follow</a>
							</div>
						</div>
						<div className="user-home-suggestion-box">
							<div className="user-home-suggestion-img">
								<a href="#"><img src="/img/noimg.png" alt=""/></a>
							</div>
							<div className="user-home-suggestion-name">
								<a href="#">John Doe</a>
							</div>
							<div className="user-home-suggestion-btn">
								<a href="#" className="btn-custom followed">Unfollow</a>
							</div>
						</div>
						<div className="user-home-suggestion-box">
							<div className="user-home-suggestion-img">
								<a href="#"><img src="/img/noimg.png" alt=""/></a>
							</div>
							<div className="user-home-suggestion-name">
								<a href="#">John Doe</a>
							</div>
							<div className="user-home-suggestion-btn">
								<a href="#" className="btn-custom">Follow</a>
							</div>
						</div>
					</div>
				</div>

			</div>

		<Modal isOpen={this.state.modal} toggle={this.toggle} className="likeModal">
          <ModalHeader toggle={this.toggle}>Likes</ModalHeader>
          <ModalBody>
		  <div className="likes-popup-list-box">
			<div className="likes-popup-profile-box d-flex align-items-center">
				<div className="likes-popup-profile-img">
					<a href="#"><img src="/img/noimg.png" alt=""/></a>
				</div>
				<div className="likes-popup-profile-name">
					<a href="#">mollyxx</a>
				</div>
				<button className="follow btn-custom">Follow</button>
			</div>
			<div className="likes-popup-profile-box d-flex align-items-center">
				<div className="likes-popup-profile-img">
					<a href="#"><img src="/img/noimg.png" alt=""/></a>
				</div>
				<div className="likes-popup-profile-name">
					<a href="#">mollyxx</a>
				</div>
				<button className="unfollow btn-custom">Unfollow</button>
			</div>
			<div className="likes-popup-profile-box d-flex align-items-center">
				<div className="likes-popup-profile-img">
					<a href="#"><img src="/img/noimg.png" alt="/"/></a>
				</div>
				<div className="likes-popup-profile-name">
					<a href="#">mollyxx</a>
				</div>
				<button className="follow btn-custom">Follow</button>
			</div>
			<div className="likes-popup-profile-box d-flex align-items-center">
				<div className="likes-popup-profile-img">
					<a href="#"><img src="/img/noimg.png" alt=""/></a>
				</div>
				<div className="likes-popup-profile-name">
					<a href="#">mollyxx</a>
				</div>
				<button className="unfollow btn-custom">Unfollow</button>
			</div>
			<div className="likes-popup-profile-box d-flex align-items-center">
				<div className="likes-popup-profile-img">
					<a href="#"><img src="/img/noimg.png" alt=""/></a>
				</div>
				<div className="likes-popup-profile-name">
					<a href="#">mollyxx</a>
				</div>
				<button className="follow btn-custom">Follow</button>
			</div>
			<div className="likes-popup-profile-box d-flex align-items-center">
				<div className="likes-popup-profile-img">
					<a href="#"><img src="/img/noimg.png" alt=""/></a>
				</div>
				<div className="likes-popup-profile-name">
					<a href="#">mollyxx</a>
				</div>
				<button className="unfollow btn-custom">Unfollow</button>
			</div>
			<div className="likes-popup-profile-box d-flex align-items-center">
				<div className="likes-popup-profile-img">
					<a href="#"><img src="/img/noimg.png" alt=""/></a>
				</div>
				<div className="likes-popup-profile-name">
					<a href="#">mollyxx</a>
				</div>
				<button className="follow btn-custom">Follow</button>
			</div>
			<div className="likes-popup-profile-box d-flex align-items-center">
				<div className="likes-popup-profile-img">
					<a href="#"><img src="/img/noimg.png" alt=""/></a>
				</div>
				<div className="likes-popup-profile-name">
					<a href="#">mollyxx</a>
				</div>
				<button className="unfollow btn-custom">Unfollow</button>
			</div>
			<div className="likes-popup-profile-box d-flex align-items-center">
				<div className="likes-popup-profile-img">
					<a href="#"><img src="/img/noimg.png" alt=""/></a>
				</div>
				<div className="likes-popup-profile-name">
					<a href="#">mollyxx</a>
				</div>
				<button className="follow btn-custom">Follow</button>
			</div>
			<div className="likes-popup-profile-box d-flex align-items-center">
				<div className="likes-popup-profile-img">
					<a href="#"><img src="/img/noimg.png" alt=""/></a>
				</div>
				<div className="likes-popup-profile-name">
					<a href="#">mollyxx</a>
				</div>
				<button className="unfollow btn-custom">Unfollow</button>
			</div>
			<div className="likes-popup-profile-box d-flex align-items-center">
				<div className="likes-popup-profile-img">
					<a href="#"><img src="/img/noimg.png" alt=""/></a>
				</div>
				<div className="likes-popup-profile-name">
					<a href="#">mollyxx</a>
				</div>
				<button className="follow btn-custom">Follow</button>
			</div>
			<div className="likes-popup-profile-box d-flex align-items-center">
				<div className="likes-popup-profile-img">
					<a href="#"><img src="/img/noimg.png" alt=""/></a>
				</div>
				<div className="likes-popup-profile-name">
					<a href="#">mollyxx</a>
				</div>
				<button className="unfollow btn-custom">Unfollow</button>
			</div>
			<div className="likes-popup-profile-box d-flex align-items-center">
				<div className="likes-popup-profile-img">
					<a href="#"><img src="/img/noimg.png" alt=""/></a>
				</div>
				<div className="likes-popup-profile-name">
					<a href="#">mollyxx</a>
				</div>
				<button className="follow btn-custom">Follow</button>
			</div>
			<div className="likes-popup-profile-box d-flex align-items-center">
				<div className="likes-popup-profile-img">
					<a href="#"><img src="/img/noimg.png" alt=""/></a>
				</div>
				<div className="likes-popup-profile-name">
					<a href="#">mollyxx</a>
				</div>
				<button className="unfollow btn-custom">Unfollow</button>
			</div>
			<div className="likes-popup-profile-box d-flex align-items-center">
				<div className="likes-popup-profile-img">
					<a href="#"><img src="/img/noimg.png" alt=""/></a>
				</div>
				<div className="likes-popup-profile-name">
					<a href="#">mollyxx</a>
				</div>
				<button className="follow btn-custom">Follow</button>
			</div>
			<div className="likes-popup-profile-box d-flex align-items-center">
				<div className="likes-popup-profile-img">
					<a href="#"><img src="/img/noimg.png" alt=""/></a>
				</div>
				<div className="likes-popup-profile-name">
					<a href="#">mollyxx</a>
				</div>
				<button className="unfollow btn-custom">Unfollow</button>
			</div>
			<div className="likes-popup-profile-box d-flex align-items-center">
				<div className="likes-popup-profile-img">
					<a href="#"><img src="/img/noimg.png" alt=""/></a>
				</div>
				<div className="likes-popup-profile-name">
					<a href="#">mollyxx</a>
				</div>
				<button className="follow btn-custom">Follow</button>
			</div>
			<div className="likes-popup-profile-box d-flex align-items-center">
				<div className="likes-popup-profile-img">
					<a href="#"><img src="/img/noimg.png" alt=""/></a>
				</div>
				<div className="likes-popup-profile-name">
					<a href="#">mollyxx</a>
				</div>
				<button className="unfollow btn-custom">Unfollow</button>
			</div>
			<div className="likes-popup-profile-box d-flex align-items-center">
				<div className="likes-popup-profile-img">
					<a href="#"><img src="/img/noimg.png" alt=""/></a>
				</div>
				<div className="likes-popup-profile-name">
					<a href="#">mollyxx</a>
				</div>
				<button className="follow btn-custom">Follow</button>
			</div>
			<div className="likes-popup-profile-box d-flex align-items-center">
				<div className="likes-popup-profile-img">
					<a href="#"><img src="/img/noimg.png" alt=""/></a>
				</div>
				<div className="likes-popup-profile-name">
					<a href="#">mollyxx</a>
				</div>
				<button className="unfollow btn-custom">Unfollow</button>
			</div>
			<div className="likes-popup-profile-box d-flex align-items-center">
				<div className="likes-popup-profile-img">
					<a href="#"><img src="/img/noimg.png" alt=""/></a>
				</div>
				<div className="likes-popup-profile-name">
					<a href="#">mollyxx</a>
				</div>
				<button className="follow btn-custom">Follow</button>
			</div>
			<div className="likes-popup-profile-box d-flex align-items-center">
				<div className="likes-popup-profile-img">
					<a href="#"><img src="/img/noimg.png" alt=""/></a>
				</div>
				<div className="likes-popup-profile-name">
					<a href="#">mollyxx</a>
				</div>
				<button className="unfollow btn-custom">Unfollow</button>
			</div>
			</div>
          </ModalBody>         
        </Modal>
	
		<Modal aria-labelledby="contained-modal-title-vcenter"
      centered isOpen={this.state.modal1} toggle={this.toggle1} className="modal-profile">
      <ModalBody className="profilem">
        <button
          type="button"
          className="close"
          onClick={this.toggle1}
          aria-label="Close"
        >
          <span aria-hidden="true">×</span>
        </button>
        <div className="commonsmall-box text-center">
          <div className="top-box mb-20">
            <div className="border-box-icon">Q</div>
          </div>
          <h3 className="mb-20">GO LIVE</h3>
          <div className="form-box">
            <p>
              Set a price for users to watch you live stream.
              <br />
              Leave blank if you want to go live without charging.
            </p>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="SET A PRICE"
              />
            </div>
            <div className="form-group pad-30">
              <button className="btn-custom">Go Live</button>
            </div>
          </div>
        </div>
      </ModalBody>
    </Modal>

	</section>
    )
  }
}

export default Page
