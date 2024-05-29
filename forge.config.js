module.exports = {
  packagerConfig: {
    asar: true,
  },
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-dmg",
      config: {
        name: "PCRN",
        format: "ULFO",
      },
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["win32"],
    },
  ],
};
