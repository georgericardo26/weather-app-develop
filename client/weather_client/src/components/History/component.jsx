import React from 'react'

export default function HistoryComponent(props){
    const { HistoryData, Pages, clickPage } = props
    return (
        <div className="container">
            <div className="entry">
                <div className="row">
                    <div className="block-history">
                        <div className="col-md-12">
                            <h2>Weather History</h2>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="block-history">
                        <div className="col-md-12">
                            <table className="table table-alt-shaded tableHistory">
                                <thead>
                                    <th>Name City</th>
                                    <th>Temperature</th>
                                    <th>Date</th>
                                </thead>
                                <tbody>
                                    {
                                        (HistoryData) ? (HistoryData.results) ? HistoryData.results.map(element => {
                                           return(
                                               <tr>
                                                   <td>{element.name_city}</td>
                                                   <td>{element.temp}</td>
                                                   <td>{element.last_date}</td>
                                               </tr>
                                           )
                                        }) : "Empty" : ""
                                    }
                                </tbody>
                            </table>
                            <ul className="list-inline">
                                <li class="list-inline-item"><button type="button" class="btn page" id="previous" disabled={Pages.previous.disabled} onClick={ev => clickPage(ev.target.id)}>previous</button></li>
                                <li class="list-inline-item"><button type="button" class="btn page" id="next" disabled={Pages.next.disabled} onClick={ev => clickPage(ev.target.id)}>next</button></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};