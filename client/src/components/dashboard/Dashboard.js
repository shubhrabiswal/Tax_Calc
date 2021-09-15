import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import classnames from "classnames";
import {
  InputGroup,
  Row,
  Form,
  Col,
  FormGroup,
  FormControl,
  ControlLabel,
  FormButton
} from "react-bootstrap";
const options = [
  {
    label: "Apple",
    value: "apple",
  },
  {
    label: "Mango",
    value: "mango",
  }]
class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      Bas: "",
      LTA: "",
      HRA: "",
      FA: "",
      Inv: "",
      Rent: "",
      CityType: "",
      Med: "",
      errors: {},
      AppHRA: "",
      TaxInc: ""
    };
  }

  checkPrice = (e) => {
    e.preventDefault();
    //YOUR PRICE EVAL BASED ON USER INPUT
    console.log("here")
    var value2 = parseInt(this.state.Rent) - (0.10 * parseInt(this.state.Bas));
    if (this.state.CityType == 'metro') {
      var value1 = 0.50 * parseInt(this.state.Bas);
      this.state.AppHRA = Math.min(value1, value2, this.state.HRA);
    }

    if (this.state.CityType == 'non-metro') {
      var value1 = 0.40 * parseInt(this.state.Bas);
      this.state.AppHRA = Math.min(value1, value2, this.state.HRA);
    }

    // Bas||!LTA||!HRA||!FA||!Inv||!Rent||!CityType||!Med
    this.state.TaxInc = (parseInt(this.state.Bas) + parseInt(this.state.LTA) + parseInt(this.state.HRA) + parseInt(this.state.FA)) - parseInt(this.state.AppHRA) - parseInt(this.state.Inv) - parseInt(this.state.Med);
    // this.setState({ totalPrice: "$100" });
    console.log(this.state.TaxInc)
    // alert(this.state.TaxInc)
    this.setState({ TaxInc: this.state.TaxInc, AppHRA: this.state.AppHRA })

  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  back = () => {
    this.setState({ totalPrice: null });
  };

  onSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });
    try {
      await this.calculate({
        Bas: this.state.Bas,
        LTA: this.state.LTA,
        HRA: this.state.HRA,
        FA: this.state.FA,
        Inv: this.state.Inv,
        Rent: this.state.Rent,
        CityType: this.state.CityType,
        Med: this.state.Med,
        AppHRA: this.state.AppHRA,
        TaxInc: this.state.TaxInc
      });
      // this.props.history.push("/Dashboard");

      this.props.dashboardUser(this.calculate)
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  };

  // handleSubmit = async event => {
  //   // debugger;
  //   event.preventDefault();

  //   this.setState({ isLoading: true });
  //   try {
  //     await this.calculate({
  //       Bas: this.state.Bas,
  //       LTA: this.state.LTA,
  //       HRA: this.state.HRA,
  //       FA: this.state.FA,
  //       Inv: this.state.Inv,
  //       Rent: this.state.Rent,
  //       CityType: this.state.CityType,
  //       Med: this.state.Med,
  //     });
  //     this.props.history.push("/Dashboard");
  //   } catch (e) {
  //     alert(e);
  //     this.setState({ isLoading: false });
  //   }
  // };

  render() {
    // const { user } = this.props.auth;
    // console.log(user,"user")
    console.log("...this.props....", this.props)
    console.log("...this.state....", this.state)
    const { errors } = this.state;

    return (

      <div style={{ height: "150vh" }} className="container valign-wrapper">
        {this.state.TaxInc ? (
          <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            <p className="flow-text grey-text text-darken-1">
              Your taxable income is {this.state.TaxInc}
            </p>

            <br></br>
            <button style={{
              width: "150px",
              borderRadius: "3px",
              letterSpacing: "1.5px",
              marginTop: "1rem"
            }}
              onClick={this.back}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3">
              Back</button>
          </div>
        ) : (
            <form noValidate onSubmit={this.checkPrice}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.Bas}
                  error={errors.Bas}
                  id="Bas"
                  type="number"
                  className={classnames("", {
                    invalid: errors.Bas
                  })}
                />
                <label htmlFor="Bas">Basic Pay</label>
                <span className="red-text">{errors.Bas}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.LTA}
                  error={errors.LTA}
                  id="LTA"
                  type="number"
                  className={classnames("", {
                    invalid: errors.Bas
                  })}
                />
                <label htmlFor="LTA">LTA</label>
                <span className="red-text">{errors.HRA}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.HRA}
                  error={errors.HRA}
                  id="HRA"
                  type="number"
                  className={classnames("", {
                    invalid: errors.HRA
                  })}
                />
                <label htmlFor="HRA">HRA</label>
                <span className="red-text">{errors.HRA}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.FA}
                  error={errors.FA}
                  id="FA"
                  type="number"
                  className={classnames("", {
                    invalid: errors.FA
                  })}
                />
                <label htmlFor="FA">FA</label>
                <span className="red-text">{errors.FA}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.Inv}
                  error={errors.Inv}
                  id="Inv"
                  type="number"
                  className={classnames("", {
                    invalid: errors.Inv
                  })}
                />
                <label htmlFor="Inv">Inv</label>
                <span className="red-text">{errors.Inv}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.Rent}
                  error={errors.Rent}
                  id="Rent"
                  type="number"
                  className={classnames("", {
                    invalid: errors.Rent
                  })}
                />
                <label htmlFor="Rent">Rent</label>
                <span className="red-text">{errors.Rent}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.CityType}
                  error={errors.CityType}
                  id="CityType"
                  type="text"
                  className={classnames("", {
                    invalid: errors.CityType
                  })}
                />
                <label>CityType
                  <select>
                    <option value="metro">metro</option>
                    <option value="non-metro">non-metro</option>
                  </select>
                </label>
                <span className="red-text">{errors.CityType}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.Med}
                  error={errors.Med}
                  id="Med"
                  type="number"
                  className={classnames("", {
                    invalid: errors.Med
                  })}
                />
                <label htmlFor="Med">Med</label>
                <span className="red-text">{errors.Med}</span>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  // type="submit"
                  onSubmit={this.checkPrice}
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Submit
                </button>
              </div>
            </form>)}
      </div>
    );
  }
}

// Dashboard.propTypes = {
//   dashboardUser: PropTypes.object.isRequired,
//   // logoutUser: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//   auth: state.auth
// });



export default Dashboard;
