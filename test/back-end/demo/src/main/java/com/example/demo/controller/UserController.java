package com.example.demo.controller;
 
import java.util.List;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
 
import com.example.demo.mapper.UserMapper;
import com.example.demo.vo.UserVO;
 
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/user")
public class UserController {
 
    @Autowired
    UserMapper userMapper;
    
    @GetMapping
    public List<UserVO> userList(){
        System.out.println(userMapper.userList());
        System.out.println("유저리스트 출력 성공");
        return userMapper.userList();
    }
    
    @PostMapping
    void insertUser(@RequestBody UserVO user) {
        userMapper.insertUser(user);
        System.out.println("유저 DB 저장 성공");
    }
    
    @GetMapping("/{uid}")
    public UserVO fetchUserByID(@PathVariable int uid) {
        System.out.println(userMapper.fetchUserByID(uid));
        UserVO fetchUser = userMapper.fetchUserByID(uid);
        return fetchUser;
    }
        
    @PutMapping("/{uid}")
    public void updateUser(@PathVariable int id, @RequestBody UserVO user) {
        
        UserVO updateUser = user;
        System.out.println("업데이트유저 => " + updateUser);
        
        updateUser.setEmail(user.getEmail());
        updateUser.setNick(user.getNick());
        updateUser.setAddr(user.getAddr());
        updateUser.setTotal_point(user.getTotal_point());
        updateUser.setGrade(user.getGrade());
        
        userMapper.updateUser(updateUser); 
    }
    
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable int uid) {
        userMapper.deleteUser(uid);
        System.out.println("유저 삭제, 성공적");
    }
    
}