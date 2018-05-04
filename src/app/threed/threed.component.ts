import { ElementRef, Injectable } from '@angular/core';
import { Component, OnInit, Input, Renderer2 } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-threed',
  templateUrl: './threed.component.html',
  styleUrls: ['./threed.component.css']
})
export class ThreedComponent implements OnInit {

        @Input() sizeX: number;
        @Input() sizeY: number;

        private camera = undefined;
        //private clearColour = '#d0d0d0';
        private clearColour = '#000000';
        private element = undefined;
        private renderer = undefined;
        private scene = undefined;
        private waitObject: THREE.Mesh = undefined;

        constructor(private ang_renderer: Renderer2, private el: ElementRef) { }

        ngOnInit() {
                this.initialiseThree(this.el);
                this.animate(this);
        }

        addBackgroundImage(path: string, name: string, z: number, voffset: number) {
                let self = this;
                let texture = new THREE.TextureLoader().load(path, 
                        function(texture){
                                let img = new THREE.MeshBasicMaterial({
                                        map: texture,
                                        transparent: true

                                });
                                img.map.needsUpdate = true;
                                img.needsUpdate = true;
                                let geometry = new THREE.PlaneBufferGeometry(self.sizeX, self.sizeY, 5);
                                let holder = new THREE.Group();
                                holder.name = name;
                                
                                holder.rotation.x = 0;
                                holder.rotation.y = Math.PI/2;
                                holder.rotation.z = Math.PI/2;
                                holder.position.x = z;

                                let imgMesh = new THREE.Mesh(geometry, img);
                                imgMesh.position.y = voffset;
                                holder.position.z = -voffset;
                                holder.add(imgMesh);
                                self.scene.add(holder);
                        });
        }

        addCube(x: number, y: number, z: number) {
                let geometry = new THREE.BoxBufferGeometry(x, y, z);
                let material = new THREE.MeshBasicMaterial({ color: 0x00ff00});
                this.waitObject = new THREE.Mesh(geometry, material);
                this.waitObject.rotation.y += 0.03;
                this.waitObject.rotation.z += 0.02;
                this.waitObject.rotation.x += 0.01;
                this.scene.add(this.waitObject);
        }

        addRibbon(name: string, x0: number, y0: number, width: number, maxHeight: number, colour: number) {
                var geometry = new THREE.PlaneGeometry( width, maxHeight );
                geometry.translate(0, maxHeight/2, 0);
                let material = new THREE.MeshBasicMaterial({ color: colour});
                var mesh = new THREE.Mesh( geometry, material );
                mesh.name = name;
                mesh.rotation.x = 0;
                mesh.rotation.y = Math.PI/2;
                mesh.rotation.z = Math.PI/2;
                mesh.position.x = 10;
                mesh.position.y = x0;
                mesh.position.z = y0;
                this.scene.add(mesh);
        }

        initialiseThree(element: ElementRef) {
                this.element = element;
                this.initScene();
                //this.addCube(10, 10, 10);
        }

        initScene() {

                this.renderer = new THREE.WebGLRenderer({alpha: true});
                this.renderer.autoClear = true ;
                this.renderer.preserveDrawingBuffer = true ;
                this.renderer.setClearColor(this.clearColour, 1);
                this.renderer.setSize( this.sizeX, this.sizeY );
                this.renderer.shadowMap.enabled = true;
                this.element.nativeElement.appendChild( this.renderer.domElement );
                this.scene = new THREE.Scene();

                //this.camera = new THREE.PerspectiveCamera( 45, this.sizeX / this.sizeY, 0.1, 10000 );
                this.camera = new THREE.OrthographicCamera(this.sizeX / -2, this.sizeX / 2, this.sizeY / 2, this.sizeY / -2, 1, 1000);
                this.camera.name = 'camera';
                this.scene.add(this.camera);
                this.camera.up.set( 0, 0, 1 );
                this.camera.position.x =  200; // ~ 2 metres
                this.camera.position.y = 0;
                this.camera.position.z = 0;
                this.camera.lookAt(new THREE.Vector3(0,0,0));
                let light = new THREE.AmbientLight(0x404040); // soft white light
                this.scene.add(light);
        }

        movePart(name: string, amount: number) {
                let part = this.scene.getObjectByName(name);
                if (part !== undefined) {
                        part.position.z = amount;
                }
        }

        pitchAndRotate(name: string, pitch: number, angle: number) {
                let part = this.scene.getObjectByName(name);
                if (part !== undefined) {
                        if (part.children[0] !== undefined) {
                                part.children[0].geometry.center();
                                part.children[0].geometry.translate(0, pitch, 0);
                        }
                        let deg = Math.PI/2 -angle * Math.PI/180;
                        part.rotation.z = deg;
                }
        }

        render() {
                if (this.waitObject !== undefined) {
                        this.waitObject.rotation.y += 0.03;
                        this.waitObject.rotation.z += 0.02;
                        this.waitObject.rotation.x += 0.01;
                }
                this.renderer.render( this.scene, this.camera );
        }

        rotatePart(name: string, angle: number) {
                let part = this.scene.getObjectByName(name);
                if (part !== undefined) {
                        part.rotation.z = Math.PI/2 + -angle * Math.PI/180;
                }
        }

        setVisibility(name: string, visible: boolean) {
                let part = this.scene.getObjectByName(name);
                if (part !== undefined) {
                        part.visible = visible;
                }
        }

        shiftLeft(name: string, units: number) {
                let part = this.scene.getObjectByName(name);
                if (part !== undefined) {
                        if (part.children[0] !== undefined) {
                                part.children[0].position.x = -units;
                        }
                }
        }

        shiftUp(name: string, units: number) {
                let part = this.scene.getObjectByName(name);
                if (part !== undefined) {
                        if (part.children[0] !== undefined) {
                                part.children[0].position.y = -units;
                        }
                }
        }

        adjustRibbon(name: string, fraction: number) {
                let part = this.scene.getObjectByName(name);
                if (part !== undefined) {
                        part.scale.set(1, fraction, 1);
                }
        }

        animate(owner) {
                requestAnimationFrame(() => {
                        owner.animate(owner) });
                owner.render();
        }
}
