module.exports = (sequelize, DataTypes) => {
  const Talk = sequelize.define('Talk', { // 테이블명은 posts
    content: {
      type: DataTypes.TEXT, // 매우 긴 글
      allowNull: false,
    },
  }, {
    charset: 'utf8mb4', //  한글+이모티콘
    collate: 'utf8mb4_general_ci',
  });
  Talk.associate = (db) => {
    db.Talk.belongsTo(db.User);
    db.Talk.hasMany(db.Comment);
  };
  return Talk;
};
