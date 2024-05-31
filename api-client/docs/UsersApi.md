# MazeGame.UsersApi

All URIs are relative to *http://localhost:3000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**userGet**](UsersApi.md#userGet) | **GET** /user | 
[**userPost**](UsersApi.md#userPost) | **POST** /user | 

<a name="userGet"></a>
# **userGet**
> InlineResponse200 userGet(name)



gets userId by userName

### Example
```javascript
import {MazeGame} from 'maze_game';

let apiInstance = new MazeGame.UsersApi();
let name = "name_example"; // String | 

apiInstance.userGet(name, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **name** | **String**|  | 

### Return type

[**InlineResponse200**](InlineResponse200.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="userPost"></a>
# **userPost**
> InlineResponse200 userPost(body)



creates user

### Example
```javascript
import {MazeGame} from 'maze_game';

let apiInstance = new MazeGame.UsersApi();
let body = new MazeGame.UserBody(); // UserBody | 

apiInstance.userPost(body, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**UserBody**](UserBody.md)|  | 

### Return type

[**InlineResponse200**](InlineResponse200.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

