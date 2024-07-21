// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.20;

import "./TNT20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TimelineManager is Ownable {
    struct Event {
        uint256 eventId;
        string date;
        string title;
        string description;
        string imageUrl;
        string author;
    }
    
    struct Episode {
        uint256 episodeId;
        string title;
        string description;
        string episodeType;
        bool changes;
        Event[] eventList;
    }

    struct EpisodeVersion {
        Episode[] episodeList;
    }

    struct Timeline {
        uint256 timelineId;
        string name;
        string purpose;
        string visibility;
        string editAccess;
        string intent;
        Episode[] episodes;
    }

    mapping(uint256 => Timeline) private timelines;
    uint256 private nextTimelineIndex;

    TNT20 public token;

    constructor(TNT20 _token) Ownable(msg.sender) {
        token = _token;
    }

    //Timeline Events
    event TimelineCreated(uint id, string name);
    event TimelineUpdated(uint id, string name);
    event TimelineDeleted(uint id);

    //Episode Events
    event EpisodeCreated(uint timelineId, uint episodeId);
    event EpisodeUpdated(uint timelineId, uint episodeId);

    //Event Events
    event EventCreated(uint timelineId, uint episodeId, uint eventId);
    event EventUpdated(uint timelineId, uint episodeId, uint eventId);
    
    modifier tokenTransfer(uint amount) {
        require(token.transferFrom(msg.sender, address(this), amount), "Token transfer failed");
        _;
    }

    //Create Timeline
    function createTimeline(
        string memory timelineName,
        string memory purpose,
        string memory visibility,
        string memory editAccess,
        string memory intent,
        Episode[] memory episodes
    ) external tokenTransfer(10 * 10**18)  { //10 tokens to create timeline
        nextTimelineIndex++;
        timelines[nextTimelineIndex] = Timeline(
            nextTimelineIndex,
            timelineName,
            purpose,
            visibility,
            editAccess,
            intent,
            episodes
        );
        emit TimelineCreated(nextTimelineIndex, timelineName);
    }

    //Update Timeline
    function updateTimeline(
        uint id,
        string memory timelineName,
        string memory purpose,
        string memory visibility,
        string memory editAccess,
        string memory intent
    ) external tokenTransfer(5 * 10**18)  { //5 tokens to update timeline
        require(timelines[id].timelineId == id, "404: Timeline not found");
        Timeline storage timeline = timelines[id];        
        timeline.name = timelineName;
        timeline.purpose = purpose;
        timeline.visibility = visibility;
        timeline.editAccess = editAccess;
        timeline.intent = intent;
        emit TimelineUpdated(id, timelineName);
    }

    //Delete Timeline
    function deleteTimeline(
        uint id
    ) external onlyOwner {
        require(timelines[id].timelineId == id, "404: Timeline not found");
        delete timelines[id];
        emit TimelineDeleted(id);
    }

    //Create Episode
    function createEpisode(
        uint timelineId, 
        Episode memory episode
    ) external tokenTransfer(3 * 10**8) { //3 tokens to create episode
        require(timelines[timelineId].timelineId == timelineId, "404: Timeline not found");
        emit EpisodeCreated(timelineId, episode.episodeId);
    }

    //Update Episode
    function updateEpisode(
        uint timelineId, 
        uint episodeId
    ) external tokenTransfer(1 * 10**8) { //1 tokens to update episode
        require(timelines[timelineId].timelineId == timelineId, "404: Timeline not found");
        emit EpisodeUpdated(timelineId, episodeId);
    }

    //Create Event
    function createEvent(
        uint timelineId, 
        Episode memory episode
    ) external tokenTransfer(3 * 10**8) { //3 tokens to create episode
        require(timelines[timelineId].timelineId == timelineId, "404: Timeline not found");
        emit EpisodeCreated(timelineId, episode.episodeId);
    }
    //Edit Event
}


