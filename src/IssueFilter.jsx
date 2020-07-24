import React from 'react';
import { withRouter } from 'react-router-dom';
import { 
  Button,
  ButtonToolbar,
  FormGroup,
  FormControl,
  ControlLabel,
  InputGroup,
  Row,
  Col, 
} from 'react-bootstrap';

class IssueFilter extends React.Component{
  
  constructor({ location: { search } }){
    super();
    const params = new URLSearchParams(search);
    this.state = {
      status: params.get('status') || '',
      changed: false,
      effortMin: params.get('effortMin') || '',
      effortMax: params.get('effortMax') || '',
    };

    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
    this.showOriginalFilter = this.showOriginalFilter.bind(this);
    this.onEffortMaxchange = this.onEffortMaxchange.bind(this);
    this.onEffortMinchange = this.onEffortMinchange.bind(this);
  }

  componentDidUpdate(prevProps){
    const { location: { search: prevSearch } } = prevProps;
    const { location: { search } } = this.props;
    if(prevSearch!==search){
      this.showOriginalFilter();
    }
  }

  onChangeStatus(e){
    this.setState({
      status: e.target.value,
      changed: true,
    });
  }
  
  onEffortMinchange(e){
    const effortString = e.target.value;
    if(effortString.match(/^\d*$/)){
      this.setState({
        effortMin: e.target.value,
        changed: true,
      })
    }
  }

  onEffortMaxchange(e){
    const effortString = e.target.value;
    if(effortString.match(/^\d*$/)){
      this.setState({
        effortMax: e.target.value,
        changed: true,
      })
    }
  }

  applyFilter(){
    const { status, effortMin, effortMax } = this.state;
    const { history, urlBase } = this.props;
    const params = new URLSearchParams();
    if(status){
      params.set('status', status);
    }
    if(effortMin){
      params.set('effortMin', effortMin);
    }
    if(effortMax){
      params.set('effortMax', effortMax);
    }

    const searchString = params.toString() ? `?${params.toString()}` : '';
    history.push({
      pathname: urlBase,
      search: searchString,
    });
  }

  showOriginalFilter(){
    const { location: { search } } = this.props;
    const params = new URLSearchParams(search);
    this.setState({
      status: params.get('status') || '',
      changed: false,
      effortMax: params.get('effortMax') || '',
      effortMin: params.get('effortMin') || '',
    });
  }

  render(){
      const { status, changed, effortMin, effortMax } = this.state;
      return(
        <Row>
          <Col xs={6} sm={4} md={3} lg={2}>
            <FormGroup>
              <ControlLabel>Status:</ControlLabel>
              <FormControl
                componentClass="select"
                value={status} 
                onChange={this.onChangeStatus}>
                <option value="">(All)</option>
                <option value="New">New</option>
                <option value="Assigned">Assigned</option>
                <option value="Fixed">Fixed</option>
                <option value="Closed">Closed</option>
              </FormControl>
            </FormGroup>
          </Col>
          <Col xs={6} sm={4} md={3} lg={2}>
            <FormGroup>
              <ControlLabel>Effort Between:</ControlLabel>
              <InputGroup>
                <FormControl
                  value={effortMin}
                  onChange={this.onEffortMinchange} />
                  <InputGroup.Addon>-</InputGroup.Addon>
                <FormControl
                  value={effortMax}
                  onChange={this.onEffortMaxchange} />
              </InputGroup>
            </FormGroup>
          </Col>
          <Col xs={6} sm={4} md={3} lg={2}>
            <FormGroup>
              <ControlLabel>&nbsp;</ControlLabel>
              <ButtonToolbar>
                <Button bsStyle="primary" type='button' onClick={this.applyFilter}>Apply</Button>
                <Button type='button' onClick={this.showOriginalFilter} disabled={!changed}>Reset</Button>
              </ButtonToolbar>
            </FormGroup>
          </Col>
        </Row>
      );
    }
  }

export default withRouter(IssueFilter);