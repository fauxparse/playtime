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
  defaultDuration: 250,
  calls: [
    [ { translateY: [0, [0.175, 0.885, 0.32, 1.275]] } ]
  ]
});

Velocity.RegisterEffect('modalHide', {
  defaultDuration: 250,
  calls: [
    [ { translateY: '100vh' } ]
  ]
});
