const API_PATH = "http://localhost:"

const PORTS = {
    'users': '8081',
    'booking': '8082',
    'restaurants': '8080',
    'venues': '8080',
    'redis': "10091"
}

const API_USER = API_PATH + PORTS.users + "/users"
const API_RES = API_PATH + PORTS.restaurants + "/restaurants"
const API_VENUE = API_PATH + PORTS.venues + "/venues"
const API_BOOK = API_PATH + PORTS.booking + "/bookings"
const API_REDIS = API_PATH + PORTS.redis + "/api/redis/restaurant"

export {API_PATH, PORTS, API_USER, API_RES, API_VENUE, API_REDIS, API_BOOK}
