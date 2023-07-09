type PlayerSpriteObj = {
    JUMP: {
        key: string
        path: string
    }
    FALL: {
        key: string
        path: string
    }
    HIT: {
        key: string
        path: string
    }
    IDLE: {
        key: string
        path: string
    }
    RUN: {
        key: string
        path: string
    }
    WALL_JUMP: {
        key: string
        path: string
    }
    DOUBLE_JUMP: {
        key: string
        path: string
    }
}

enum gameState {
    MENU = 0,
    GAMEPLAY = 1,
    PAUSE = 2,
    GAME_OVER = 3,
}
