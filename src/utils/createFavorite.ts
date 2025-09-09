//  event object shape to construct
// {
//     id: event.id,
//     type: "event",
//     title: event.short_title,
//     subtitle: event.venue.display_location,
//     link: `/events/${event.id}`,
// }

//  venue object shape to construct
// {
//     id: venue.id,
//     type: "venue",
//     title: venue.name,
//     subtitle: venue.display_location,
//     link: `/venues/${venue.id}`,
// }


// Standardized shape for FavoriteButton
interface FavoriteItem {
    id: number;
    type: 'venue' | 'event';
    title: string;
    subtitle: string;
    link: string;
}

// Raw API types (simplified)
interface VenueApi {
    id: number;
    name: string;
    display_location: string;
}

interface EventApi {
    id: number;
    short_title: string; // discriminator
    venue: {
        display_location: string
    };
}

// constructing 'favorite' objects to store in localStorage
export function createFavorite(item: VenueApi | EventApi): FavoriteItem {
    if ('short_title' in item) {
        // property above is unique to event objects
        return {
            id: item.id,
            type: 'event',
            title: item.short_title,
            subtitle: item.venue.display_location,
            link: `/events/${item.id}`,
        };
    } else {
        // It's a venue
        return {
            id: item.id,
            type: 'venue',
            title: item.name,
            subtitle: item.display_location,
            link: `/venues/${item.id}`,
        };
    }
}

