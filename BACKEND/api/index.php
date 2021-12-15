<?php
    use Psr\Http\Message\ResponseInterface as Response;
    use Psr\Http\Message\ServerRequestInterface as Request;
    use Slim\Factory\AppFactory;
    use \Firebase\JWT\JWT;
    
    require __DIR__ . '/../vendor/autoload.php';

    function addHeaders(Response $response): Response {
        $response = $response
        ->withHeader("Content-Type", "application/json")
        ->withHeader("Access-Control-Allow-Origin", ("https://tp05-durst-thomas.herokuapp.com"))
        ->withHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept, Origin, Authorization")
        ->withHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
        ->withHeader("Access-Control-Expose-Headers", "Authorization");

        return $response;
    }

    const JWT_SECRET = "tp05JWTKey";

    $options = [
        'attribute' => 'token',
        'header' => 'Authorization',
        'regexp' => "/Bearer\s+(.*)$/i",
        'secure' => false,
        'algorithm' => ['HS256'],
        'secret' => JWT_SECRET,
        'path' => ['/api'],
        'ignore' => ["/api/hello", "/api/login", "/api/auth"],
        "error" => function ($response, $arguments) {
            $data = array("ERREUR" => "Connexion", "Erreur" => "JWT Non valide");
            $response = $response->withStatus(401);
            return $response->withHeader("Content-Type", "application/json")->getBody()->write(json_encode($data));
        }
    ];

    function createJWT(Response $response): Response {
        $issuedAt = time();
        $expirationTime = $issuedAt + 600;
        $payload = array(
            'iat' => $issuedAt,
            'exp' => $expirationTime
        );

        $token_jwt = JWT::encode($payload, JWT_SECRET, "HS256");

        $response = $response->withHeader("Authorization", "Bearer {$token_jwt}");

        return $response;
    }
    
    
    $app = AppFactory::create();

    $app->get('/hello/{name}', function (Request $request, Response $response, $args) {
            $response->getBody()->write(json_encode($args));

            $token_jwt = createJWT($response);
            $response = $response->withHeader("Authorization", "Bearer {$token_jwt}");

            return $response;
        }
    );
    
    $app->get("/api/auth/{login}", function(Request $request, Response $response, $args){
        $login = $args['login'];

        if($login) {
            $data = array('login' => $login);
            $response = addHeaders($response, $request->getHeader('Origin'));
            $response = createJWT($response);
            $response->getBody()->write(json_encode($data));
        } else {
            $response = $response->withStatus(401);
        }

        return $response;
    });

    $app->post("/api/login", function(Request $request, Response $response, $args){
        
        $err = false;
        $body = $request->getParsedBody();
        $login = $body['login'] ?? "";
        $pass = $body['pass'] ?? "";

        if(!preg_match("/[a-zA-Z0-9]{1,20}/", $login)) {
            $err = true;
        }
        if(!preg_match("/[a-zA-Z0-9]{1,20}/", $pass)) {
            $err = true;
        }

        if($login != "admin") {
            $err = true;
        }

        if($pass != "admin") {
            $err = true;
        }

        if(!$err){
            $response = addHeaders($response);
            $response = createJWT($response);
            $data = array('login' => $login, 'password' => $pass);
            $response->getBody()->write(json_encode($data));
        } else {
            $response = $response->withStatus(401);
        }

        return $response;
    });

    $app->add(new Tuupola\Middleware\JwtAuthentication($options));

    $app->run();
?>