import React from 'react';
import './App.css';

import FaceRecognitionFrame from './components/FaceRecognitionFrame/FaceRecognitionFrame';
import ImageInputForm from './components/ImageInputForm/ImageInputForm';
import Logo from './components/Logo/Logo';
import Navigation from './components/Navigation/Navigation';
import Rank from './components/Rank/Rank';
import Signin from './components/Signin/Signin';
import Signup from './components/Signup/Signup';

const initialState = {
    input: '',
    imageUrl: '',
    faceBoundingBox: {},
    route: 'signin',
    userSignedIn: false,
    user: {
        id: '',
        name: '',
        email: '',
        entries: 0
    }
}

class App extends React.Component {
    constructor() {
        super();
        this.state = initialState;
    }

    loadUser = (user) => {
        this.setState({
            user: user
        });
    }

    findFaceLocation = (data) => {
        const face = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('imageFrame');
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            leftCol: face.left_col * width,
            topRow: face.top_row * height,
            rightCol: width - (face.right_col * width),
            bottomRow: height - (face.bottom_row * height)
        }

    }

    /* event handler methods*/
    displayFaceBoundingBox = (box) => {
        this.setState({ faceBoundingBox: box });
    }

    onInputChange = (event) => {
        this.setState({ input: event.target.value });

    }

    onImageSubmitted = async () => {
        this.setState({ imageUrl: this.state.input });
        const imageInput = document.getElementById('imageInput');
        const newImage = document.getElementById('imageFrame').src;
        imageInput.value = '';

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER}/api/clarifai/facedetection`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    input: this.state.input
                })
            });
            const clarifaiResponse = await response.json();
            //This will run only if the image url is valid and not the same image url
            if (clarifaiResponse.outputs && this.state.imageUrl !== newImage) {
                try {
                    const response = await fetch(`${process.env.REACT_APP_SERVER}/users/image`, {
                        method: 'put',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            id: this.state.user.id
                        })
                    });
                    const entries = await response.json();
                    this.setState({
                        user: {
                            ...this.state.user,
                            entries: entries
                        }
                    })
                }
                catch (err) {
                    console.log(err);
                }
                this.displayFaceBoundingBox(this.findFaceLocation(clarifaiResponse));
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    onRouteChange = (route) => {
        if (route === 'signout' || route === 'signin') {
            this.setState(initialState);
        } else if (route === 'home') {
            this.setState({ userSignedIn: true });
        }
        this.setState({ route: route });
    }

    render() {
        const { imageUrl, faceBoundingBox, userSignedIn, route, user, input } = this.state;
        return (
            <div className="App" >
                <Navigation userSignedIn={userSignedIn} onRouteChange={this.onRouteChange} />
                {
                    route === 'home'
                        ?
                        <div>
                            <Logo />
                            <Rank name={user.name} entries={user.entries} />
                            <ImageInputForm
                                onInputChange={this.onInputChange}
                                onImageSubmitted={this.onImageSubmitted}
                                input={input} />
                            <FaceRecognitionFrame
                                faceBoundingBox={faceBoundingBox}
                                imageUrl={imageUrl} />
                        </div>
                        :
                        (
                            route === 'signin'
                                ? <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
                                : <Signup onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
                        )
                }
            </div>
        )
    }
}

export default App;
