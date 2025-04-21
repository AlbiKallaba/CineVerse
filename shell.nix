{ pkgs ? import <nixpkgs> {} }:

pkgs.stdenv.mkDerivation {
  name = "ueb";

  # Define build inputs
  buildInputs = with pkgs; [
    vscode  # Visual Studio Code
    live-server  # Development server
  ];

  # Shell environment setup
  shellHook = ''
    echo "Starting live-server on port 5500..."
    # live-server -p 5500 --hard > /dev/null 2>&1 &
  '';
}
