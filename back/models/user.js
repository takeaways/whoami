module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', { // 테이블명은 users
    nickname: {
      type: DataTypes.STRING(20), // 20글자 이하
      allowNull: false, // 필수
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true, // 고유한 값
    },
    password: {
      type: DataTypes.STRING(100), // 100글자 이하
      allowNull: false,
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci', // 한글이 저장돼요
  });

  User.associate = (db) => {
    db.User.hasMany(db.Talk);
    db.User.hasMany(db.Comment);
  };

  return User;
};
