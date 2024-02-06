// 必要なライブラリのインポート
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let mixer
let model;

/**
 * 基本設定
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// シーン
const scene = new THREE.Scene()

// スクロールイベントによる画像表示の制御
window.addEventListener('scroll', () => {
    const scrollPercentage = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);

    // 特定のスクロール範囲で画像を表示
    if (scrollPercentage >= 0.5 && scrollPercentage <= 0.7) {
        const opacity = (scrollPercentage - 0.5) / 0.2;  // スクロールに応じて透明度を変更
        imageMaterial.opacity = opacity;
    } else {
        // 範囲外では画像を非表示
        imageMaterial.opacity = 0;
    }
});
// GLTFモデルの読み込み
const loader = new GLTFLoader();
loader.load('/models/room.glb',
    function (gltf) {
        model = gltf.scene;
        model.position.y = - objectsDistance * 0
        model.position.x = 2
        
        scene.add(model) 
        mixer = new THREE.AnimationMixer(model);
        const clips = gltf.animations;
        clips.forEach(function (clip){
            const action = mixer.clipAction(clip);
            action.play();
        });
    }, undefined, function (e) {
        console.error(e);
    });

/**
 * オブジェクト
 */
const objectsDistance = 4

/**
 * パーティクル
 */
// ジオメトリ
const particlesCount = 200
const positions = new Float32Array(particlesCount * 3)
const particlesGeometry = new THREE.BufferGeometry()
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

// マテリアル
const particlesMaterial = new THREE.PointsMaterial({
    color: '#ffeded',
    sizeAttenuation: true,
    size: 0.03
})

// ポイント
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)
/**
 * ライト
 */
const directionalLight = new THREE.DirectionalLight('#ffffff', 1.3)
directionalLight.position.set(3, 2, 1.5)
scene.add(directionalLight)

//光源
const dirLight = new THREE.SpotLight(0xffffff, 1);
dirLight.position.set(-10, 30, 30);
scene.add(dirLight);

/**
 * サイズ
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspRatio: window.innerWidth / window.innerHeight
}

window.addEventListener('resize', () => {
    console.log("Window resized");
    // サイズの更新
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // カメラの更新
    camera.aspect = window.innerWidth / window.innerHeight;
    
    // 視野角の再計算
    const aspRatio = window.innerWidth / window.innerHeight;
    let fov;
    
    if (aspRatio > 1) {
        fov = 45;
      } else if (aspRatio > 0.8) {
        fov = 50;
      } else if (aspRatio > 0.7) {
        fov = 55;
      } else if (aspRatio > 0.6) {
        fov = 65;
      }  else if (aspRatio > 0.5) {
        fov = 75;
      }  else if (aspRatio > 0.4) {
        fov = 80;
      } else {
        fov = 90;
      }
      
   
    camera.fov = fov;
    camera.updateProjectionMatrix();

    // レンダラーの更新
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));

    console.log("Window resized:", sizes.width, sizes.height);
});

/**
 * スクロール
 */
function lerp(start, end, t) {
    return start * (1.4 - t) + end * t;
}

window.addEventListener('scroll', () => {
    const scrollPercentage = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);

    // スクロール位置による条件分岐
    if (scrollPercentage < 0) {
    } else if (scrollPercentage >= 0 && scrollPercentage <= 0.05) {
        // 0.2から0.3までの範囲に対するカメラの位置変更処理
        function moveCameraOnScroll0(scrollPercentage) {
            // スクロールの値に応じてカメラの位置を更新する
            const startX = 5.1; // 開始位置
            const endX = 5.1; // 終了位置
            const startY = 2.88; // 開始y位置
            const endY = 2.88; // 終了y位置
            const startZ = 3.59; // 開始z位置
            const endZ = 3.59; // 終了z位置
            camera.position.x = lerp(startX, endX, (scrollPercentage - 0) / 0.1); // 0.2～0.3の範囲を0～1に変換
            camera.position.y = lerp(startY, endY, (scrollPercentage - 0) / 0.1);
            camera.position.z = lerp(startZ, endZ, (scrollPercentage - 0) / 0.1);
        }

        moveCameraOnScroll0(scrollPercentage)
    } else if (scrollPercentage >= 0.05 && scrollPercentage <= 0.3) {
        // 0.2から0.3までの範囲に対するカメラの位置変更処理
        function moveCameraOnScroll023(scrollPercentage) {
            // スクロールの値に応じてカメラの位置を更新する
            const startX = 4.5; // 開始位置
            const endX = 4; // 終了位置
            const startY = 3.12; // 開始y位置
            const endY = 3.3; // 終了y位置
            const startZ = 4.9; // 開始z位置
            const endZ = 6; // 終了z位置
            camera.position.x = lerp(startX, endX, (scrollPercentage - 0.2) / 0.1); // 0.2～0.3の範囲を0～1に変換
            camera.position.y = lerp(startY, endY, (scrollPercentage - 0.2) / 0.1);
            camera.position.z = lerp(startZ, endZ, (scrollPercentage - 0.2) / 0.1);
        }

        moveCameraOnScroll023(scrollPercentage)
    } else if (scrollPercentage >= 0.39 && scrollPercentage <= 0.55) {

        function moveCameraOnScroll045(scrollPercentage) {
            // スクロールの値に応じてカメラの位置を更新する
            const startX = 3.4; // 開始位置
            const endX = 1.7; // 終了位置
            const startY = 2.36; // 開始y位置
            const endY = 0.1; // 終了y位置
            const startZ = 4; // 開始z位置
            const endZ = 0.1; // 終了z位置
            camera.position.x = lerp(startX, endX, (scrollPercentage - 0.45) / 0.1);
            camera.position.y = lerp(startY, endY, (scrollPercentage - 0.45) / 0.1);
            camera.position.z = lerp(startZ, endZ, (scrollPercentage - 0.45) / 0.1);
        }
        moveCameraOnScroll045(scrollPercentage);

    } else if (scrollPercentage >= 0.56 && scrollPercentage <= 0.82) {
        function moveCameraOnScroll046(scrollPercentage) {
            // スクロールの値に応じてカメラの位置を更新する
            const startX = 2.2; // 開始位置
            const endX = 2.2; // 終了位置
            const startY = 0.75; // 開始y位置
            const endY = 0.75; // 終了y位置
            const startZ = 1.2; // 開始z位置
            const endZ = 1.2; // 終了z位置
            camera.position.x = lerp(startX, endX, (scrollPercentage - 0.46) / 0.1);
            camera.position.y = lerp(startY, endY, (scrollPercentage - 0.46) / 0.1);
            camera.position.z = lerp(startZ, endZ, (scrollPercentage - 0.46) / 0.1);
        }

        moveCameraOnScroll046(scrollPercentage);
    } else if (scrollPercentage >= 0.83 && scrollPercentage <= 0.88) {
        function moveCameraOnScroll083(scrollPercentage) {
            // スクロールの値に応じてカメラの位置を更新する
            const startX = 2.3; // 開始位置
            const endX = 2.47; // 終了位置
            const startY = 0.75; // 開始y位置
            const endY = -1.4; // 終了y位置
            const startZ = 1.2; // 開始z位置
            const endZ = 0.4; // 終了z位置
            camera.position.x = lerp(startX, endX, (scrollPercentage - 0.83) / 0.1);
            camera.position.y = lerp(startY, endY, (scrollPercentage - 0.83) / 0.1);
            camera.position.z = lerp(startZ, endZ, (scrollPercentage - 0.83) / 0.1);
        }

        moveCameraOnScroll083(scrollPercentage);
    } else if (scrollPercentage >= 0.89 && scrollPercentage <= 1.5) {
        function moveCameraOnScroll089(scrollPercentage) {
            // スクロールの値に応じてカメラの位置を更新する
            const startX = 2.38; // 開始位置
            const endX = 2.38; // 終了位置
            const startY = -0.06; // 開始y位置
            const endY = -0.06; // 終了y位置
            const startZ = 0.9; // 開始z位置
            const endZ = 0.9; // 終了z位置
            camera.position.x = lerp(startX, endX, (scrollPercentage - 0.89) / 0.1);
            camera.position.y = lerp(startY, endY, (scrollPercentage - 0.89) / 0.1);
            camera.position.z = lerp(startZ, endZ, (scrollPercentage - 0.89) / 0.1);
        }

        moveCameraOnScroll089(scrollPercentage);
    }

});

/**
 * カーソル
 */
const cursor = {}
cursor.x = 0
cursor.y = 0

const scaleFactor = 0.5; // カーソルの動きのスケールファクター（より小さな値）

window.addEventListener('mousemove', (event) => {
    cursor.x = (event.clientX / sizes.width - 0.5) * scaleFactor; // カーソルの X 座標をスケーリング
});

/**
 * カメラ
 */
// グループ
const cameraGroup = new THREE.Group()
scene.add(cameraGroup)

// 基本カメラ
const camera = new THREE.PerspectiveCamera(40, sizes.width / sizes.height, 0.1, 100)
camera.position.set(7, 4, 5);
camera.lookAt(new THREE.Vector3(2, -0.4, 0));
cameraGroup.add(camera)

/**
 * レンダラー
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
animate();

function animate() {
    requestAnimationFrame(animate);
    // 描画する
    renderer.render(scene, camera);
}

/**
 * アニメーション
 */
const clock = new THREE.Clock()
let previousTime = 0
const tick = () => {
    if(mixer){
        mixer.update(0.01)
    }

    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    const scrollPercentage = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);

    if (scrollPercentage <= 0.4) {
        // カーソルのアニメーション
        const parallaxX = cursor.x * 0.5
        const parallaxY = - cursor.y * 0.5
        cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 1 * deltaTime
        cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 1 * deltaTime
    }

    // レンダリング
    renderer.render(scene, camera)

    // 次のフレームで再度tickを呼ぶ
    window.requestAnimationFrame(tick)
}
tick()
