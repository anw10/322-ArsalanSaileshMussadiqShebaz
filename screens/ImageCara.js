import * as React from "react";
import { StyleSheet, View, ScrollView, Dimensions, Image } from "react-native";

const DEVICE_WIDTH = Dimensions.get("window").width;

export default class ImageCara extends React.Component {
    scrollRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0
        };
        this.scrollRef = React.createRef();
    }
    componentDidMount = () => {
        setInterval(() => {
            this.setState(
                prev => ({
                    selectedIndex:
                        prev.selectedIndex === this.props.images.length - 1
                            ? 0
                            : prev.selectedIndex + 1
                }),
                () => {
                    this.scrollRef.current.scrollTo({
                        animated: true,
                        x: DEVICE_WIDTH * this.state.selectedIndex,
                        y: 0
                    });
                }
            );
        }, 6000);
    };

    setSelectedIndex = event => {
        const contentOffset = event.nativeEvent.contentOffset;
        const viewSize = event.nativeEvent.layoutMeasurement;
        // Divide the horizontal offset by the width of the view to see which page is visible
        const selectedIndex = Math.floor(contentOffset.x / viewSize.width);
        this.setState({ selectedIndex });
    };
    render() {
        const { images } = this.props;
        const { selectedIndex } = this.state;
        return (
            <View style={styles.contain}>
                <ScrollView
                    horizontal
                    pagingEnabled
                    onMomentumScrollEnd={this.setSelectedIndex}
                    ref={this.scrollRef}
                >
                    {images.map(image => (
                        <Image
                            style={styles.backgroundImage}
                            source={image}
                            key={image}
                        />
                    ))}
                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    backgroundImage: {
        height: 500,
        width: Dimensions.get("window").width
    },
    contain: {
        height: 500
    },
});