Velocity.RegisterEffect('slidePageIn', {
  defaultDuration: 500,
  calls: [
    [ { translateX: 0 } ]
  ]
});

Velocity.RegisterEffect('slidePageLeft', {
  defaultDuration: 500,
  calls: [
    [ { translateX: '-100%', opacity: 0 } ]
  ]
});

Velocity.RegisterEffect('slidePageRight', {
  defaultDuration: 500,
  calls: [
    [ { translateX: '100%', opacity: 0 } ]
  ]
});

Velocity.RegisterEffect('menuItemIn', {
  defaultDuration: 500,
  calls: [
    [ { opacity: 1, translateY: 0 } ]
  ]
});

Velocity.RegisterEffect('menuItemOutDown', {
  defaultDuration: 500,
  calls: [
    [ { opacity: 0, translateY: '50%' } ]
  ]
});

Velocity.RegisterEffect('menuItemOutUp', {
  defaultDuration: 500,
  calls: [
    [ { opacity: 0, translateY: '-50%' } ]
  ]
});

Velocity.RegisterEffect('modalShow', {
  defaultDuration: 500,
  calls: [
    [ { opacity: 1, translateY: [0, [0, 0.25, 0.35, 1.2]] } ]
  ]
});

Velocity.RegisterEffect('modalHide', {
  defaultDuration: 500,
  calls: [
    [ { opacity: 0, translateY: ['100vh', [0.65, -0.2, 1, 0.75]] } ]
  ]
});
