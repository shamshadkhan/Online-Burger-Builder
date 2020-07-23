import React,{Component} from 'react';
import Modal from '../components/UI/Modal/Modal';
import Auxilary from './Auxilary';

const WithErrorHandler = (WrapperComponent,axios) => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                errorStatus: false,
                errorMessage: "Something went Wrong!!"
            };
            this.interceptorsReq = axios.interceptors.request.use(req=> req,
            error=> {
                this.setState({errorStatus:true});
                this.setState({errorMessage:error.message});
                return Promise.reject(error);
            });
            this.interceptorsRes = axios.interceptors.response.use(res=> res,
            error=> {
                this.setState({errorStatus:true});
                this.setState({errorMessage:error.message});
                return Promise.reject(error);
            });  
        }
        
        componentWillUnmount = () => {
            axios.interceptors.request.eject(this.interceptorsReq);
            axios.interceptors.response.eject(this.interceptorsRes);
        } 

        errorConfirmed = () => {
            this.setState({errorStatus:false});
        }

        render () {
            return (
                <Auxilary>
                    <Modal show={this.state.errorStatus} close={this.errorConfirmed}>
                        {this.state.errorMessage}
                    </Modal>
                    <WrapperComponent {...this.props}/>
                </Auxilary>
            )
        }
        
    }
}

export default WithErrorHandler;