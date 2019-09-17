import React from "react";
import PropTypes from "prop-types";
import { API_URL } from "../../../../../contants/config";
import { NavLink } from "redux-first-router-link";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const displayName = "UserProfileForm";
const propTypes = {
  users:PropTypes.object.isRequired,
  tabs: PropTypes.object.isRequired,
  tabShow: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
  toggle1: PropTypes.func.isRequired,
  modal: PropTypes.bool.isRequired,
  modal1: PropTypes.bool.isRequired,
  handleBack : PropTypes.func.isRequired
};

const Form = ({ tabs, tabShow, toggle, modal, toggle1, modal1,handleBack, users }) => (
  <section className="pad-40 user-profile-section">
    <div className="top-back-bar">
      <div className="container container630">
        <div className="row align-items-center">
          <div className="col-3">
            <div className="back-prev">
              <NavLink to="#" onClick={handleBack}>
                <i className="fa fa-chevron-left"></i> <span>Back</span>
              </NavLink>
            </div>
          </div>
          <div className="col-6 text-center">
            <div className="top-back-bar-name">{users.name}</div>
          </div>
          <div className="col-3 text-right">
            <div className="top-back-coin-need">
              Q <span>{ users.coins !== null ? users.coin : '0' }</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="container container630 bg-white p-4 box-shadow">
      <div className="profile-info-box clearfix">
        <div className="profile-avtar">
          <div className="profile-avtar-border live">
            <div className="live-hori-img-wrap">
              <a href="#" onClick={toggle} className="inline-popup">
                <img src={ users.photo != "" ? API_URL + "/" + users.photo : "/img/noimg.png"} width="150" height="150" alt="" />

                <div className="icon-plus">
                  <i className="fa fa-plus-circle"></i>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="profile-follow-detail">
          <div className="profile-follow-top-row mb-20">
            <div className="row">
              <div className="col-4 text-center">
                <div className="icons">0</div>
                <div className="text">Posts</div>
              </div>
              <div className="col-4 text-center">
                <div className="icons">
                  <a href="#">{users.followers}</a>
                </div>
                <div className="text">Followers</div>
              </div>
              <div className="col-4 text-center">
                <div className="icons">
                  <a href="#">{users.following}</a>
                </div>
                <div className="text">Following</div>
              </div>
            </div>
          </div>
          <div className="profile-follow-btn">
            <a href="#" className="btn-custom">
              Follow
            </a>
            <a href="#" className="btn-custom">
              Message
            </a>
            <a href="#" className="btn-custom live-btn">
              live
            </a>
          </div>
        </div>
        <div className="profile-about-info clearfix pt-20">
          <div className="profile-name mb-10">{users.name}</div>
          <div className="profile-about-text">
            <p>
              Hey there, it’s <strong>Molly Bennett</strong> (@MollyX) Who wants
              to see how naughty my everyday life is? And maybe join me in the
              fun? Subscribe here to chat with me ? Let me blow your mind… and
              other things!{" "}
            </p>
            <p>
              my website <a href="#">www.google.com</a>
            </p>
          </div>
        </div>
        <div className="profile-social-link pt-20">
          <ul>
            <li>
              <a href="#">
                <span className="icon">
                  <i className="fa fa-facebook f-a"></i>
                </span>
              </a>
            </li>
            <li>
              <a href="#">
                <span className="icon">
                  <i className="fa fa-instagram f-a"></i>
                </span>
              </a>
            </li>
            <li>
              <a href="#">
                <span className="icon">
                  <i className="fa fa-twitter f-a"></i>
                </span>
              </a>
            </li>
            <li>
              <a href="#">
                <span className="icon">
                  <i className="fa fa-gift f-a"></i>
                </span>
              </a>
            </li>
            <li>
              <a href="#">
                <span className="icon">
                  <i className="fa fa-snapchat-ghost f-a"></i>
                </span>
              </a>
            </li>
            <li>
              <a href="#">
                <span className="icon">
                  <i className="fa fa-youtube-play f-a"></i>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="profile-post-info pt-40">
        <div className="profile-post-list">
          <ul className="clearfix">
            <li className={tabs.tab1 ? "tab-active" : null}>
              <NavLink to="#" onClick={() => tabShow(1)}>
                Post
              </NavLink>
            </li>
            <li className={tabs.tab2 ? "tab-active" : null}>
              <NavLink to="#" onClick={() => tabShow(2)}>
                Dummy test tab
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="profile-post-content">
          <div
            className="profile-post-content-box"
            id="tab1"
            style={{ display: tabs.tab1 ? "block" : "none" }}
          >
            <div className="profile-all-post-list">
              <div className="row">
                <div className="col-4">
                  <div className="profile-post-item ">
                    <a
                      href="#"
                      onClick={toggle1}
                      className="inline-popup"
                      data-effect="mfp-zoom-in"
                    >
                      <img src="/img/noimg.png" alt="" />
                      <div className="overlay-bg">
                        <div className="overlay-icon">
                          <div className="overlay-icon-box">
                            <i className="fa fa-heart"></i>
                            <span>59</span>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="col-4">
                  <div className="profile-post-item">
                    <a
                      href="#profile-post-popup2"
                      className="inline-popup"
                      data-effect="mfp-zoom-in"
                    >
                      <img src="/img/noimg.png" alt="" />
                      <div className="overlay-bg">
                        <div className="overlay-icon">
                          <div className="overlay-icon-box">
                            <i className="fa fa-heart"></i>
                            <span>59</span>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="col-4">
                  <div className="profile-post-item">
                    <a
                      href="#profile-post-popup3"
                      className="inline-popup"
                      data-effect="mfp-zoom-in"
                    >
                      <img src="/img/noimg.png" alt="" />
                      <div className="overlay-bg">
                        <div className="overlay-icon">
                          <div className="overlay-icon-box">
                            <i className="fa fa-heart"></i>
                            <span>59</span>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="col-4">
                  <div className="profile-post-item">
                    <a href="#">
                      <img src="/img/noimg.png" alt="" />
                      <div className="overlay-bg">
                        <div className="overlay-icon">
                          <div className="overlay-icon-box">
                            <i className="fa fa-heart"></i>
                            <span>59</span>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="col-4">
                  <div className="profile-post-item">
                    <a href="#">
                      <img src="/img/noimg.png" alt="" />
                      <div className="overlay-bg">
                        <div className="overlay-icon">
                          <div className="overlay-icon-box">
                            <i className="fa fa-heart"></i>
                            <span>59</span>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="col-4">
                  <div className="profile-post-item">
                    <a href="#">
                      <img src="/img/noimg.png" alt="" />
                      <div className="overlay-bg">
                        <div className="overlay-icon">
                          <div className="overlay-icon-box">
                            <i className="fa fa-heart"></i>
                            <span>59</span>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="col-4">
                  <div className="profile-post-item">
                    <a href="#">
                      <img src="/img/noimg.png" alt="" />
                      <div className="overlay-bg">
                        <div className="overlay-icon">
                          <div className="overlay-icon-box">
                            <i className="fa fa-heart"></i>
                            <span>59</span>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="col-4">
                  <div className="profile-post-item">
                    <a href="#">
                      <img src="/img/noimg.png" alt="" />
                      <div className="overlay-bg">
                        <div className="overlay-icon">
                          <div className="overlay-icon-box">
                            <i className="fa fa-heart"></i>
                            <span>59</span>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="col-4">
                  <div className="profile-post-item">
                    <a href="#">
                      <img src="/img/noimg.png" alt="" />
                      <div className="overlay-bg">
                        <div className="overlay-icon">
                          <div className="overlay-icon-box">
                            <i className="fa fa-heart"></i>
                            <span>59</span>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="profile-post-content-box"
            id="tab2"
            style={{ display: tabs.tab2 ? "block" : "none" }}
          >
            <h4>Dummy test tab</h4>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div>
        </div>
      </div>
    </div>
    <Modal aria-labelledby="contained-modal-title-vcenter"
      centered isOpen={modal} toggle={toggle} className="modal-profile">
      <ModalBody className="profilem">
        <button
          type="button"
          className="close"
          onClick={toggle}
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

    <Modal size="lg"  aria-labelledby="contained-modal-title-vcenter"
      centered isOpen={modal1} toggle={toggle1} className="modal-story">
      <ModalBody>
        <button
          type="button"
          className="close"
          onClick={toggle1}
          aria-label="Close"
        >
          <span aria-hidden="true">×</span>
        </button>
        <div className="profile-post-popup-wrap d-flex p-relative">
				<div className="profile-post-popup-head">
					<div className="profile-post-head-box d-flex align-items-center">
						<div className="profile-post-person-img">
							<a href="#"><img src="/img/noimg.png" alt=""/></a>
						</div>
						<div className="profile-post-person-name">
							<a href="#">mollyxx</a>
						</div>
					</div>
				</div>
				<div className="profile-post-popup-img">
					<div className="profile-post-popup-slider">
						<div><img src="/img/noimg.png" alt=""/></div>
						<div>
							<div className="video-slide">
							<img src="/img/noimg.png" alt=""/>
								<video controls="" poster="/img/noimg.png">
								    <source src="/img/sample-video.mp4" type="video/mp4"/>
								</video>
							</div>
						</div>
						<div><img src="/img/noimg.png" alt=""/></div>
						<div><img src="/img/noimg.png" alt=""/></div>
					</div>
				</div>
				<div className="profile-post-popup-content-box">
					<div className="profile-post-popup-content">
						<p>Hey there, it’s <strong>Molly Bennett</strong> (@MollyX) Who wants to see how naughty my everyday life is? And maybe join me in the fun? Subscribe here to chat with me ? Let me blow your mind… and other things! </p>
						<a href="#">#aboc</a>
						<p>my website <a href="#">www.google.com</a></p>
					</div>
					<div className="profile-post-popup-likes-box d-flex align-items-center">
						<div className="likes-icon">
							<i className="fa fa-heart"></i>
							<i className="fa fa-heart"></i>
						</div>
						<div className="likes-people">Liked by <span><a href="#" className="last-person">John</a></span> and <span><a href="#" className="likes-popup">106 Others</a></span></div>
						<div className="likes-popup-bg hide">
							<div className="likes-popup-margin">
								<div className="likes-popup-box">
									<div className="likes-popup-content">
										<div className="likes-popup-top-box">
											<span>Likes</span>
											<div className="close">×</div>	
										</div>
									</div>
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
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
       </ModalBody>
    </Modal>
  </section>
);

Form.displayName = displayName;
Form.propTypes = propTypes;

export default Form;