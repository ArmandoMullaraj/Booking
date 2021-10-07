import { diffDays } from "../../actions/hotel";
import { useHistory, Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const SmallCard = ({ h, handleHotelDelete = (f) => f, owner = false, showViewMoreButton = true, }) => { //we getting the ({h})otel as props
    const history = useHistory();
    return (
        <>
            <div className="card mb-3">
                <div className="row no-gutters">
                    <div className="col-md-4">
                        {h.image && h.image.contentType ? (
                            <img src={`${process.env.REACT_APP_API}/hotel/image/${h._id}`} //if we have the hotel img we show the image
                                alt="default hotel image"
                                className="card-image img-fluid"
                            />
                        ) : (
                            <img src="https://via.placeholder.com/900x500.png?text=MERN+Booking" //otherwise we show the default image
                                alt="default hotel image"
                                className="card-image img-fluid"
                            />
                        )}
                    </div>
                    <div className="col-md-8">
                        <h3 className="card-title">{h.title}<span className="float-right text-primary"> 0.00€</span></h3>
                        <p className="alert alert-info">{h.location}</p>
                        <p className="card-text">{`${h.content.substring(0, 200)}...`}</p> {/* to display the first 200 words of the content */}
                        <p className="card-text">
                            <span className="float-right text-primary">
                                for {diffDays(h.from, h.to)}{" "}
                                {diffDays(h.from, h.to) <= 1 ? 'day' : 'days'}
                            </span>
                        </p>
                        <p className="card-text">{h.bed} bed</p>
                        <p className="card-text">Avaliable from {new Date(h.from).toLocaleDateString()}</p>

                        <div className="d-flex justify-content-between h4">
                            {showViewMoreButton && (
                                 <button
                                  onClick={() => history.push(`/hotel/${h._id}`)} 
                                  className="btn btn-primary">Show More</button>
                            )}
                            {
                                owner && (<>
                                    <Link to={`/hotel/edit/${h._id}`}>
                                        <EditOutlined className="text-warning" />
                                    </Link>
                                    <DeleteOutlined
                                        onClick={() => handleHotelDelete(h._id)}
                                        className="text-danger"
                                    />
                                </>
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SmallCard;