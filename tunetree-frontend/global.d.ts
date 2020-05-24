// this file is here to allow typescript to deal with CSS Modules
// without this, on each clone of this repo, one would have to go into 
// node_modules/react-scripts and alter the webpack config. Or, they would 
// have to eject the webpack config from node_modules, and lose some functionality 
// with react-scripts

declare module '*.css';