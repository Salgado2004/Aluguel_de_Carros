//Eu usei uma biblioteca pronta para ganhar tempo

let splide = new Splide( '#main-carousel', {
    pagination: false,
} );
  
let thumbnails = document.getElementsByClassName( 'thumbnail' );
let current;
  
for ( i = 0; i < thumbnails.length; i++ ) {
initThumbnail( thumbnails[ i ], i );
}

function initThumbnail( thumbnail, index ) {
thumbnail.addEventListener( 'click', function () {
    splide.go( index );
} );
}

splide.on( 'mounted move', function () {
let thumbnail = thumbnails[ splide.index ];

if ( thumbnail ) {
    if ( current ) {
    current.classList.remove( 'is-active' );
    }

    thumbnail.classList.add( 'is-active' );
    current = thumbnail;
}
} );

splide.mount();