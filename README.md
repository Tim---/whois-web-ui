# whois-web-ui
A Web UI based on the RIPE REST Whois API

Basically, it offers 2 features :

  * show the results of a whois query grouped by object type, in a tabular form ;
  * allows to quickly make inverse search on an object.

### Building

```sh
./docker/build.sh
```

### Running

```sh
./docker/run.sh
```

Then, you can connect to http://127.0.0.1:5000/ to get the UI.

### Detailled documentation

![Documentation](documentation.jpg)
