import React from 'react'
import { 
  Modal, ModalHeader, ModalBody, ModalFooter, Nav
} from 'reactstrap';
import { NavLink } from "redux-first-router-link";
import Carousel  from 'react-multi-carousel';
import { API_URL } from "../../../../contants/config"
import 'react-multi-carousel/lib/styles.css';
import LikeuserComponent from "../likeusers/index"

import AwesomeSlider from 'react-awesome-slider';
import AwesomeSliderStyles from 'react-awesome-slider/src/styles';


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



class Page extends React.Component {
  static displayName = 'HomePage'
  static propTypes = {}

  constructor (props) {
	super(props)   
	
	this.state = { activeIndex: 0 ,modal: false,modal1: false,
	authUser: this.props.authUser,
	authUserPhoto:
	this.props.authUser.photo != ""
	  ? API_URL + "/" + this.props.authUser.photo
	  : "/img/noimg.png",
	};
    
	this.toggle = this.toggle.bind(this);
	this.toggle1 = this.toggle1.bind(this);
	
  }

   //modal toggle
   toggle(uniqueID) {
	console.log('unique',uniqueID)
    this.setState(prevState => ({
      modal: !prevState.modal
	}));

	let obj = {
        uniqueID: uniqueID
      }
	this.props.likeUsers(obj)

  }

	//modal toggle
	toggle1() {
		this.setState(prevState => ({
			modal1: !prevState.modal1
		}));
	}
 

  likePost = (uniqueID,type) => {	
	console.log('like uniqueID',uniqueID)
	let obj = {
		uniqueID : uniqueID,
		type : type
	}
	this.props.likePost(obj)
  }

  render () {
	const authUser = this.props.authUser
	const posts = this.props.posts;
	const { authUserPhoto } = this.state; 
	
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
				{posts.length ? (
					posts.map(post => {						
						return (
						<div key={post.uniqueId} className="user-home-post-box mb-30 bgwhite box-shadow">
						<div className="user-home-post-head d-flex align-items-center">
							<div className="user-home-profile-img">
								<a href="#"><img src= { post.photo != "" ? API_URL + "/" + post.photo : "/img/noimg.png" } alt="User Profile"/></a>
							</div>
							<div className="user-home-profile-name">
								<a href="#">{post.username}</a>
							</div>
						</div>
						<div className="user-home-post-slider">           
							<AwesomeSlider infinite={false} bullets={false} cssModule={AwesomeSliderStyles}>
							{post.posts.map(item => (
							<div key={item.path} data-src={ API_URL + "/" + item.path} />
    						))}
       					    </AwesomeSlider>
            			</div>
						<div className="user-home-post-foot">
							<div className="user-home-post-likes-box d-flex align-items-center">
								<div className="likes-icon">									
									{
										post.likeStatus === '1'? <NavLink to="#" className="likeposticon" onClick={() => this.likePost(post.uniqueId,'dislike')}><i className="fa fa-heart"></i></NavLink> : <NavLink to="#" className="likeposticon" onClick={() => this.likePost(post.uniqueId,'like')}><i className="fa fa-heart-o"></i></NavLink>
									}
								</div>
								{
									post.likeStatus === '1' && post.likeCount > 0 ? <div className="likes-people">Liked by <span><NavLink to={'/edit-profile/'} className="last-person">You</NavLink></span>  and <span><NavLink to="#" className="likes-popup" onClick={() => this.toggle(post.uniqueId)}>{post.likeCount} Others</NavLink></span></div> 
									:  ( post.likeCount === 0 && post.likeStatus === '1' ? <div className="likes-people">Liked by <span><NavLink  to={'/edit-profile/'} className="last-person">You</NavLink></span></div> : <div className="likes-people">{post.likeCount}</div>)
								}
																							
							</div>
						</div>
						<Modal isOpen={this.state.modal} toggle={() => this.toggle(post.uniqueId)} className="likeModal">
							<ModalHeader toggle={() => this.toggle(post.uniqueId)}>Likes</ModalHeader>
							<ModalBody>	
							<div  className="likes-popup-list-box">	 
							<LikeuserComponent/>
							</div>
							</ModalBody>        
						</Modal>
					</div>
					)
					})					
					) : (
					  <div className="no-record">
						<h3>No Record Found.</h3>
					  </div>
					)}
				
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
				</div>

		
				<div className="user-home-profile-col scrolltofixed">
					<div className="user-home-profile-box d-flex align-items-center">
						<div className="user-home-profile-box-img">
							<a href="#"><img src={authUserPhoto} alt=""/></a>
						</div>
						<div className="user-home-profile-box-name">
							<a href="#">{authUser.username}</a>
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
