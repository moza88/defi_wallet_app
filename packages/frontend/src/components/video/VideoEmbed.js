import React from "react";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    cardContent: {
        padding: theme.spacing(3),
    },

    video_responsive: {
        overflow: "hidden",
        position: "relative",
        paddingBottom: "56.25%",
        height: 0,
    },

    video_responsiveness_iframe: {
        left: 0,
        top: 0,
        height: "100%",
        width: "100%",
        position: "absolute"
    }

}));

const VideoEmbed = ({ embedId }) => (

    <div className="video-responsive">
        <iframe
            width="853"
            height="480"
            src={`https://player.vimeo.com/video/${embedId}`}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="API Key for Directly Control the Asset"
        />

    </div>
);

VideoEmbed.propTypes = {
    embedId: PropTypes.string.isRequired
};

export default VideoEmbed;
