import './s_header.css'

const FeedHeader = () => {
  return (
    <div id="s_header">
        <ul>
            <li className="header_items" id="active">Feedback & Complaints</li>
            <li className="header_items">Registered Pharmacies</li>
            <li className="header_items">Pending Requests</li>
            <li className="header_items">Approved Requests</li>
            <li className="header_items">Rejected Requests</li>
        </ul>
    </div>
  )
}

export default FeedHeader
