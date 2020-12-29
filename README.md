# Srsrv

Simple static resource server.

# How to use?

Simple:

```typescript
import {Srsrv} from 'srsrv';

const srsrv = new Srsrv();
srsrv.route('/', 'path/to/index.html');
srsrv.start(8080);
```

If you needs header:

```typescript
import {Srsrv} from 'srsrv';

const srsrv = new Srsrv();
srsrv.route('/', 'path/to/index.html', {
    'Content-Type': 'text/html; charset=UTF-8'
});
srsrv.start(8080);
```

Using with `ws`:

```typescript
import {Srsrv} from 'srsrv';

const srsrv = new Srsrv();
srsrv.route('/', 'path/to/index.html');
const server = srsrv.start(8080);
const socket = new ws.Server({server});
```

# Why?

Reinventing the wheel.
