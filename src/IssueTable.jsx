  import React from 'react';
  import { withRouter } from 'react-router-dom';
  import { 
      Button, Tooltip, OverlayTrigger, Table,
   } from 'react-bootstrap';
   import { LinkContainer } from 'react-router-bootstrap';
  
  const IssueRow = withRouter(({ 
      issue, 
      location: { search },
      closeIssue,
      deleteIssue,
      index,  
    }) => { 
    const searchLocation = { pathname: `/issues/${issue.id}`, search };
    const closeToolTip =(
        <Tooltip id="close-tooltip" placemetn="top">Close Issue</Tooltip>
    );
    const deleteToolTip = (
        <Tooltip id="delte-tooltip" placement="top">Delete Issue</Tooltip>
    );
    const editToolTip = (
        <Tooltip id="edit-tooltip" placement="top">Edit Issue</Tooltip>
    )

    function onClose(e){
        e.preventDefault();
        closeIssue(index);
    }

    function onDelete(e){
        e.preventDefault();
        deleteIssue(index);
    }
    const tableRow = (
        <tr>
            <td>{issue.id}</td>
            <td>{issue.status}</td>
            <td>{issue.owner}</td>
            <td>{issue.created.toDateString()}</td>
            <td>{issue.effort}</td>
            <td>{issue.due ? issue.due.toDateString() : ''}</td>
            <td>{issue.title}</td>
            <td>
                <LinkContainer to={`/edit/${issue.id}`}>
                    <OverlayTrigger
                        delay={1000}
                        overlay={editToolTip}>
                            <Button bsSize="xsmall">
                                <span className="fa fa-edit"></span>
                            </Button>
                        </OverlayTrigger>
                </LinkContainer>
                {' '}
                <OverlayTrigger delay={1000} overlay={closeToolTip}>
                    <Button  bsSize="xsmall" onClick={onClose}>
                        <span className="fa fa-close"></span>
                    </Button>
                </OverlayTrigger>
                {'  '}
                <OverlayTrigger delay={1000} overlay={deleteToolTip}>
                    <Button  bsSize="xsmall" onClick={onDelete}>
                        <span className="fa fa-trash"></span>
                    </Button>
                </OverlayTrigger>
            </td>
        </tr>
    );
    return(
        <LinkContainer to={searchLocation}>
            {tableRow}
        </LinkContainer>
    );
});

export default function IssueTable({ issues, closeIssue, deleteIssue }){
    const issueRows = issues.map((issue, index) =>
        <IssueRow 
            key={issue.id} 
            issue={issue} 
            closeIssue={closeIssue} 
            deleteIssue={deleteIssue}
            index={index} />
    );

    return(
        <Table bordered condensed hover responsive>
            <thead>
                <tr>
                    <td>ID</td>
                    <td>Status</td>
                    <td>Owner</td>
                    <td>Created</td>
                    <td>Effort</td>
                    <td>Due Date</td>
                    <td>Title</td>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {issueRows}
            </tbody>
        </Table>
    );
}