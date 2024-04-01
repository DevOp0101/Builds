var playerData = {
    playerPriority: {
        objectPriorityList: persistentList()
    },
    playerPhysics: {
        levelOffsetX: 0,
        levelOffsetY: 0,
        characterOffsetX: 0,
        characterOffsetY: 0
    },
    playerAnimation: {
        characterAnimationAngle: 0,
        characterAnimationFrame: 0
    }    
}

var aIData = {
    aIInteractiveDistance: 0,
    aIOffsetX: 0,
    aIOffsetY: 0,
    aIMovementLerp: 0,
    aIAnimationType: 0,
    aIAnimationAngle: 0,
    aIJumpHeight: 0,
    aIAnimating: false,
    aIWaypoints: [],
    aIWaypointIndex: 0
}