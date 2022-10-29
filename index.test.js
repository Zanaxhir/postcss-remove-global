var postcss = require('postcss');

var plugin = require('./');

function run(input, output, opts) {
    return postcss([ plugin(opts) ]).process(input)
        .then(result => {
            expect(result.css).toEqual(output);
            expect(result.warnings().length).toBe(0);
        });
}

it('remove :global - as a single selector', () => {
    return run(':global { a{ } }', 'a{ }', { });
});

it('remove :global - as part of selector', () => {
    return run(
        '.root :global .text { margin: 0 6px; }',
        '.root .text { margin: 0 6px; }',
        { });
});

it('remove :global - as part of selector with selector included', () => {
    return run(
        '.root :global(.foo) .text { margin: 0 6px; }',
        '.root .foo .text { margin: 0 6px; }',
        { });
});

it('remove :global - as part of selector with multiple spaces', () => {
    return run(
        '.root :global  .text { margin: 0 6px; }',
        '.root .text { margin: 0 6px; }',
        { });
});

// eslint-disable-next-line max-len
it('remove :global - as part of selector with selector with underscores included', () => {
    return run(
        '.root :global(.foo_bar__foo) .text { margin: 0 6px; }',
        '.root .foo_bar__foo .text { margin: 0 6px; }',
        { });
});

// eslint-disable-next-line max-len
it('remove :global - as part of selector with selector with dashes included', () => {
    return run(
        '.root :global(.foo-bar--foo) .text { margin: 0 6px; }',
        '.root .foo-bar--foo .text { margin: 0 6px; }',
        { });
});

// eslint-disable-next-line max-len
it('remove multiple :global - as part of selector with selector included', () => {
    return run(
        '.root :global(.foo) :global(.bar) .text { margin: 0 6px; }',
        '.root .foo .bar .text { margin: 0 6px; }',
        { });
});


it('remove :global - as part of @keyframe params', () => {
    return run('@keyframes :global(zoomIn) { }', '@keyframes zoomIn { }', { });
});

it('remove :global - as part of @keyframe params with an underscore', () => {
    return run(
        '@keyframes :global(zoom_in) { }',
        '@keyframes zoom_in { }',
        { }
    );
});

it('remove :global - as part of @keyframe params with a dash', () => {
    return run(
        '@keyframes :global(zoom-in) { }',
        '@keyframes zoom-in { }',
        { }
    );
});
