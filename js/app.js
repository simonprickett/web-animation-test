var app = {
    sprites: [],
    deg: 0,

    initialize: function() {
        var canvas = document.getElementById('myCanvas'),
            sprite,
            dx,
            dy;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        sprite = new Image();
        sprite.src = 'images/simon.png';

        for (n = 0; n < 50; n++) {
            dx = Math.floor(Math.random() * 2) == 0  ? -1 : 1;
            dy = Math.floor(Math.random() * 2) == 0  ? -1 : 1; 
            app.sprites.push({ img: sprite, x: Math.floor(Math.random() * canvas.width), y: Math.floor(Math.random() * canvas.height), dx: 1, dy: -1 });
        }

        window.requestAnimationFrame(app.render);
    },

    render: function() {
        var canvas = document.getElementById('myCanvas'),
            context,
            sprite,
            n;

        context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);

        canvas.style.transform = 'rotate(' + app.deg + 'deg)';

        if (app.deg == 360) {
            app.deg = 0;
        } else { 
            app.deg+=2;
        }

        for (n = 0; n < app.sprites.length; n++) {
            sprite = app.sprites[n];
            sprite.x += sprite.dx;
            sprite.y += sprite.dy;

            if (sprite.x <= 20) {
                sprite.dx = 1;
            } else {
                if (sprite.x >= (canvas.width - 40)) {
                    sprite.dx = -1;
                }
            }

            if (sprite.y <= 20) {
                sprite.dy = 1;
            } else {
                if (sprite.y >= (canvas.height - 100)) {
                    sprite.dy = -1;
                }
            }

            context.drawImage(sprite.img, sprite.x, sprite.y);
        }

        window.requestAnimationFrame(app.render);
    }
}

window.onload = function() {
    app.initialize();
}