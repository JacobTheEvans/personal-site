import React from "react";
import FontAwesome from "react-fontawesome";
import Modal from "react-modal";
import {Link} from "react-router-dom";

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(251, 251, 251, 0.75)'
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

class ManageItem extends React.Component {
  genAddInputs() {
    let headers = [];
    for (let key in this.props.data[0]) {
      if(key.indexOf("_") !== 0) {
        headers.push(key);
      }
    }
    return headers.map((item) => {
      if (item === "text") {
        return (
          <textarea key={item} style={{height: "400px"}} onChange={(event) => {
          this.props.handleAddInput(item, event);
        }}  value={this.props.modalInfo[item]} type="text" className="u-full-width" placeholder={item[0].toUpperCase() + item.substring(1, item.length)}>
        </textarea>)
      } else {
        return (<input onChange={(event) => {
          this.props.handleAddInput(item, event);
        }} key={item} value={this.props.modalInfo.input[item]} type="text" className="u-full-width" placeholder={item[0].toUpperCase() + item.substring(1, item.length)}/ >)
      }
    });
  }
  genEditInputs() {
    let headers = [];
    for (let key in this.props.modalInfo.editData) {
      if(key.indexOf("_") !== 0) {
        headers.push(key);
      }
    }
    return headers.map((item) => {
      if (item === "text") {
        return (
          <textarea key={item} style={{height: "500px"}} onChange={(event) => {
          this.props.handleEditInput(item, event);
        }}  value={this.props.modalInfo.editData[item]} type="text" className="u-full-width" placeholder={item[0].toUpperCase() + item.substring(1, item.length)}>
        </textarea>)
      } else {
        return (<input onChange={(event) => {
          this.props.handleEditInput(item, event);
        }} key={item} value={this.props.modalInfo.editData[item]} type="text" className="u-full-width" placeholder={item[0].toUpperCase() + item.substring(1, item.length)}/ >)
      }
    });
  }
  genHeaders() {
    let headers = [];
    for (let key in this.props.data[0]) {
      if(key.indexOf("_") !== 0) {
        headers.push(key);
      }
    }
    let headerItems = headers.map((item, index) => {
      return (
        <th key={item + index}>{item[0].toUpperCase() + item.substring(1, item.length)}</th>
      );
    });
    headerItems.push(
      <th key="edit">Edit</th>
    );
    headerItems.push(
      <th key="remove">Remove</th>
    );
    return headerItems;
  }
  genRows() {
    return this.props.data.map((item, index) => {
      let dataItems = [];
      for (let key in item) {
        if(key.indexOf("_") !== 0) {
          let displayText = "";
          if (item[key].length > 20) {
            displayText = item[key].substring(0, 20) + "...";
          } else {
            displayText = item[key];
          }
          dataItems.push(
            <td key={key + item[key]}>{displayText}</td>
          );
        }
      }
      dataItems.push((
        <td key="edit">
          <button onClick={()=> {
            this.props.openModal("edit", index);
            this.props.loadInEditData(item)
          }}>Edit</button>
        </td>
      ));
      dataItems.push((
        <td onClick={() => {
          this.props.handleRemove(item._id);
        }} key="remove">
          <button>Remove</button>
        </td>
      ));
      return (
        <tr key={item.toString() + index}>{dataItems}</tr>
      );
    });
  }
  render() {
    return (
      <div className="manger-section">
        <button onClick={() => {
          this.props.openModal("add")
        }} className="add-button-right">
          <FontAwesome name="plus "/>
        </button>
        <Modal isOpen={this.props.modalInfo.add} onRequestClose={() => {
          this.props.closeModal("add")
        }} style={customStyles} contentLabel="Add Modal">
          <h3 className="modal-header">Add {this.props.name.substring(0, this.props.name.length - 1)}</h3>
          {this.genAddInputs()}
          <div className="modal-button-section">
            <button className="save-btn" onClick={this.props.handleAdd}>
              Add
            </button>
            <button className="exit-btn" onClick={() => {
              this.props.closeModal("add")
            }}>close</button>
          </div>
        </Modal>
        <Modal isOpen={this.props.modalInfo.edit} onRequestClose={() => {
          this.props.closeModal("edit")
        }} style={customStyles} contentLabel="Edit Modal">
          <h3 className="modal-header">Edit {this.props.name.substring(0, this.props.name.length - 1)}</h3>
          {this.genEditInputs()}
          <div className="modal-button-section">
            <button className="save-btn" onClick={this.props.handleSave}>
              Save
            </button>
            <button className="exit-btn" onClick={() => {
              this.props.closeModal("edit")
            }}>close</button>
          </div>
        </Modal>
        <h3 className="manage-header">{this.props.name}</h3>
        <table className="u-full-width">
          <thead>
            <tr>{this.genHeaders()}</tr>
          </thead>
          <tbody>
            {this.genRows()}
          </tbody>
        </table>
        <Link to="/manage" className="button button-blue u-full-width large-btn-custom btn-end">
          Back
        </Link>
      </div>
    )
  }
}

export default ManageItem;
