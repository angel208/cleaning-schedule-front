export default function getDateFormatted( date : Date ) {
    return new Date(date).toLocaleDateString('en-us', { weekday:"short", year:"numeric", month:"short", day:"numeric"}) 
}