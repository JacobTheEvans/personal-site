import React from "react";
import FontAwesome from "react-fontawesome";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../actions/";
import autoBind from "react-autobind";

import ManageItem from "../components/manage-item.js";

class ManageItemContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {},
      editData: {},
      index: -1,
      add: false,
      edit: false
    };
    autoBind(this);
    if(this.props.token === null) {
      window.location.href = "/#/"
    } else {
      this.props.loadPorts();
      this.props.loadArticles();
    }

  }
  componentDidMount() {
    document.querySelector(".footer").style.display = "none";
    document.querySelector(".bm-burger-button").style.display = "none";
  }
  componentWillUnmount() {
    document.querySelector(".footer").style.display = "inherit";
    document.querySelector(".bm-burger-button").style.display = "inherit";
  }
  openModal(key, index) {
    this.setState({
      [key]: true,
      index
    });
  }
  closeModal(key) {
    this.setState({
      [key]: false
    })
  }
  handleAddInput(key, event) {
    this.setState({
      input: {
        ...this.state.input,
        [key]: event.target.value
      }
    });
  }
  handleEditInput(key, event) {
    this.setState({
      editData: {
        ...this.state.editData,
        [key]: event.target.value
      }
    });
  }
  loadInEditData(data) {
    this.setState({
      editData: data
    });
  }
  formatName(path) {
    let baseName = path.substring(path.lastIndexOf("/") + 1, path.length);
    let result = "";
    for(let i = 0; i < baseName.length; i++) {
      if(baseName[i] === baseName[i].toUpperCase()) {
        result += " "
      }
      result += baseName[i];
    }
    return result[0].toUpperCase() + result.substring(1, result.length);
  }
  genKeyForRedux(path) {
    let baseName = path.substring(path.lastIndexOf("/") + 1, path.length);
    let result = "";
    for(let i = 0; i < baseName.length; i++) {
      result += baseName[i];
    }
    return result;
  }
  emptyInput() {
    for(let key in this.state.input) {
      this.setState({
        input: {
          ...this.state.input,
          [key]: "",
        }
      });
    }
  }
  emptyEdit() {
    for(let key in this.state.editData) {
      this.setState({
        editData: {
          ...this.state.editData,
          [key]: ""
        }
      });
    }
  }
  handleAdd() {
    if(this.genKeyForRedux(this.props.location.pathname) === "articles") {
      this.props.addArticle(this.state.input, this.props.token);
    } else {
      this.props.addPort(this.state.input, this.props.token);
    }
    this.emptyInput();
    this.setState({
      add: false
    });
  }
  handleSave() {
    if(this.genKeyForRedux(this.props.location.pathname) === "articles") {
      this.props.updateArticle(this.state.editData._id, this.state.editData, this.props.token);
    } else {
      this.props.updatePort(this.state.editData._id, this.state.editData, this.props.token);
    }
    this.emptyEdit();
    this.setState({
      edit: false
    });
  }
  handleRemove(id) {
    if(this.genKeyForRedux(this.props.location.pathname) === "articles") {
      this.props.removeArticle(id, this.props.token);
    } else {
      this.props.removePort(id, this.props.token);
    }
  }
  render() {
    return (
      <div>
        <a className="home-btn" href="/">
          <FontAwesome name="home"/>
        </a>
        <ManageItem
          loadInEditData={this.loadInEditData}
          handleRemove={this.handleRemove}
          handleEditInput={this.handleEditInput}
          handleSave={this.handleSave}
          handleAdd={this.handleAdd}
          handleAddInput={this.handleAddInput}
          modalInfo={this.state}
          openModal={this.openModal}
          closeModal={this.closeModal}
          name={this.formatName(this.props.location.pathname)}
          data={this.props[this.props.match.params.id]}
         />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageItemContainer);
